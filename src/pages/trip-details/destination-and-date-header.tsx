import { MapPin, Calendar, Settings2, X, ArrowRight } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from 'react-router-dom'
import { api } from "../../lib/axios";
import { FormEvent, useEffect, useState } from "react";
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DateRange, DayPicker } from "react-day-picker";

interface TripType {
    id: string
    destination: string
    starts_at: Date
    ends_at: Date
    is_confirmed: boolean
}

export function DestinationAndDateHeader() {
    const { tripId } = useParams()

    const [isOpenEditeTripModal, setIsOpenEditeTripModal] = useState(false)
    const [isOpenEditeDatePicker, setIsOpenEditeDatePicker] = useState(false)

    const [editeEventStartAndEndDates, setEditeEventStartAndEndDates] = useState<DateRange | undefined>()
    const [trip, setTrip] = useState<TripType | undefined>()

    useEffect(() => {
        api.get(`/trips/${tripId}`)
            .then(response => {
                setTrip(response.data.trip)
                setEditeEventStartAndEndDates({
                    from: response.data.trip.starts_at,
                    to: response.data.trip.ends_at
                })
            })
    }, [tripId])

    function handleOpenEditeDatePicker() {
        setIsOpenEditeDatePicker(true)
    }

    function handleCloseEditeDatePicker() {
        setIsOpenEditeDatePicker(false)
    }

    function handleOpenEditeTripModal() {
        setIsOpenEditeTripModal(true)
    }

    function handleCloseEditeTripModal() {
        setIsOpenEditeTripModal(false)
    }

    function displayedDate(dateStart: Date | undefined, dateEnd: Date | undefined) {
        const displayedDate = dateStart && dateEnd ? format(dateStart, "d' de 'LLL", {
            locale: ptBR
        }).concat(' até ').concat(
            format(dateEnd, "d' de 'LLL", {
                locale: ptBR
            })
        ) : null


        return displayedDate
    }

    async function handleEditeTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!trip) {
            return
        }

        const data = new FormData(event.currentTarget)
        const destination = data.get('destination')?.toString() || trip.destination

        if (!destination) {
            return
        }

        if (!editeEventStartAndEndDates) {
            return
        }

        if (!editeEventStartAndEndDates.from || !editeEventStartAndEndDates.to) {
            return
        }

        await api.put(`/trips/${tripId}`, {
            destination,
            starts_at: editeEventStartAndEndDates.from,
            ends_at: editeEventStartAndEndDates.to
        })

        handleCloseEditeTripModal()
    }

    if (isOpenEditeTripModal) {
        return (
            <form onSubmit={handleEditeTrip} className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center gap-3 justify-between">
                <div className='flex items-center flex-1 gap-2'>
                    <MapPin className='size-5 text-zinc-400' />
                    <input type="text" name="destination" defaultValue={trip?.destination || ''} placeholder="Para onde você vai?" className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1' />
                </div>

                <button onClick={handleOpenEditeDatePicker} type="button" className='flex items-center gap-2 w-[200px]'>
                    <Calendar className='size-5 text-zinc-400' />
                    <span className='text-lg text-zinc-400'>
                        {displayedDate(editeEventStartAndEndDates?.from, editeEventStartAndEndDates?.to) || 'Quando?'}
                    </span>
                </button>

                <div className='w-px h-6 bg-zinc-800' />

                <Button type="submit">
                    Continuar
                    <ArrowRight className='size-5' />
                </Button>

                {
                    isOpenEditeDatePicker && (
                        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
                            <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                                <div className='space-y-2'>
                                    <div className='flex items-center justify-between'>
                                        <h2 className='font-semibold text-lg'>Selecione a data</h2>

                                        <button onClick={handleCloseEditeDatePicker} type="button">
                                            <X className='size-5 text-zinc-400' />
                                        </button>
                                    </div>

                                    <DayPicker mode='range' selected={editeEventStartAndEndDates} onSelect={setEditeEventStartAndEndDates} />
                                </div>
                            </div>
                        </div>
                    )
                }
            </form >
        )
    }

    return (
        <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MapPin className='size-5 text-zinc-400' />
                <span className="text-zinc-100">{trip?.destination}</span>
            </div>

            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <Calendar className='size-5 text-zinc-400' />
                    <span className="text-zinc-100">{displayedDate(trip?.starts_at, trip?.ends_at) || ''}</span>
                </div>

                <div className='w-px h-6 bg-zinc-800' />


                <Button onClick={handleOpenEditeTripModal} type='button' variant='secondary'>
                    Alterar local/data
                    <Settings2 className='size-5' />
                </Button>
            </div>
        </div>
    )
}