import { MapPin, Calendar, ArrowRight, Settings2, X } from 'lucide-react'
import { Button } from '../../../components/button'
import { useState } from 'react'
import { DayPicker, DateRange } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { format } from 'date-fns'
import {ptBR} from 'date-fns/locale'

interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean
    handleCloseGuestsInput: () => void
    handleOpenGuestsInput: () => void
    setDestination: (destination: string)=> void
    setEventStartAndEndDates: (date: DateRange | undefined)=> void
    eventStartAndEndDates: DateRange | undefined
}

export function DestinationAndDateStep({
    handleCloseGuestsInput,
    handleOpenGuestsInput,
    isGuestsInputOpen,
    setDestination,
    setEventStartAndEndDates,
    eventStartAndEndDates,
}: DestinationAndDateStepProps) {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

    function handleOpenDatePicker() {
        setIsDatePickerOpen(true)
    }

    function handleCloseDatePicker() {
        setIsDatePickerOpen(false)
    }

    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
        ? format(eventStartAndEndDates.from, "d' de 'LLL", {
            locale: ptBR
        }).concat(' até ').concat(
            format(eventStartAndEndDates.to, "d' de 'LLL", {
                locale: ptBR
            })
        ) : null

    return (
        <div className='h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3 shadow-shape'>
            <div className='flex items-center flex-1 gap-2'>
                <MapPin className='size-5 text-zinc-400' />
                <input disabled={isGuestsInputOpen} onChange={event => setDestination(event.target.value)} type="text" placeholder="Para onde você vai?" className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1' />
            </div>

            <button onClick={handleOpenDatePicker} disabled={isGuestsInputOpen} type="button" className='flex items-center gap-2 w-[200px]'>
                <Calendar className='size-5 text-zinc-400' />
                <span className='text-lg text-zinc-400'>
                    {displayedDate || 'Quando?'}
                </span>
            </button>

            <div className='w-px h-6 bg-zinc-800' />

            {isGuestsInputOpen ? (
                <Button onClick={handleCloseGuestsInput} type='button' variant='secondary'>
                    Alterar local/data
                    <Settings2 className='size-5' />
                </Button>
            ) : (
                <Button onClick={handleOpenGuestsInput} type="submit">
                    Continuar
                    <ArrowRight className='size-5' />
                </Button>
            )}

            {isDatePickerOpen && (
                <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
                    <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                        <div className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <h2 className='font-semibold text-lg'>Selecione a data</h2>

                                <button onClick={handleCloseDatePicker} type="button">
                                    <X className='size-5 text-zinc-400' />
                                </button>
                            </div>

                            <DayPicker mode='range' selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}