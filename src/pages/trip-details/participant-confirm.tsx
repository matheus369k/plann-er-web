import { AtSign } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ParticipantConfirmProps {
    handleCloseManageGuests: ()=> void
    findParticipantIdForEmail: (email: string) => string | undefined
}

interface TripType {
    id: string
    destination: string
    starts_at: string
    ends_at: string
    is_confirmed: boolean
}

export function ParticipantConfirm({
    handleCloseManageGuests,
    findParticipantIdForEmail,
}: ParticipantConfirmProps) {
    const { tripId } = useParams()

    const [trip, setTrip] = useState<TripType>()

    useEffect(()=>{
        api.get(`/trips/${tripId}`)
            .then(response => {
                setTrip(response.data.trip)
            })
    }, [tripId])

    async function handleGuestConfirm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const email = data.get('email')?.toString()

        if (!email) {
            return
        }

        const participantId = findParticipantIdForEmail(email)

        if (!participantId) {
            return
        }

        await api.get(`/participants/${participantId}/confirm`)

        handleCloseManageGuests()

        window.location.reload()
    }

    const displayedDate = trip && (
        format(trip.starts_at, "d' de 'MMMM", {
            locale: ptBR
        }).concat(' a ').concat(format(trip.ends_at, "d' de 'MMMM' de 'y", {
            locale: ptBR
        }))
    )
    return (
        <>
            <div className='space-y-2'>
                <h2 className='font-semibold text-lg text-center'>Confirmar participação</h2>

                <p className='text-sm text-zinc-400 text-left'>
                    Você foi convidado(a) para participar de uma viagem para <span className='font-semibold text-zinc-100'>{trip?.destination}</span> nas datas de <span className='font-semibold text-zinc-100'>{displayedDate}</span>
                </p>

                <p className='text-sm text-zinc-400 text-left'>
                    Para confirmar sua presença na viagem, preencha os dados abaixo:
                </p>
            </div>

            <form onSubmit={handleGuestConfirm} className='space-y-3'>
                <div className='px-2.5 h-14 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                    <AtSign className='text-zinc-400 size-5' />
                    <input type="email" name='email' placeholder="E-mail do participante" className='bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1' />
                </div>


                <Button size="full" type="submit">
                    Confirmar presença
                </Button>
            </form>
        </>
    )
}