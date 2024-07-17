import { X, AtSign, Plus, User } from 'lucide-react'
import { FormEvent } from 'react'
import { Button } from '../../components/button'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ConfirmTripModalProps {
    handleCloseConfirmTripModal: () => void
    handleCreateTrip: (event: FormEvent<HTMLFormElement>) => void
    setOwnerName: (name: string) => void
    setOwnerEmail: (email: string) => void
    eventStartAndEndDates: DateRange | undefined
    destination: string
}

export function ConfirmTripModal({
    handleCloseConfirmTripModal,
    handleCreateTrip,
    setOwnerEmail,
    setOwnerName,
    destination,
    eventStartAndEndDates
}: ConfirmTripModalProps) {
    const displayedDate = eventStartAndEndDates?.from && eventStartAndEndDates?.to &&
        format(eventStartAndEndDates?.from, "d' de 'MMMM", {
            locale: ptBR
        }).concat(' a ').concat(format(eventStartAndEndDates.to, "d' de 'MMMM' de 'y", {
            locale: ptBR
        }))

    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-semibold text-lg'>Confirmar criação de viagem</h2>

                        <button onClick={handleCloseConfirmTripModal} type="button">
                            <X className='size-5 text-zinc-400' />
                        </button>
                    </div>

                    <p className='text-sm text-zinc-400 text-left'>
                        Para concluir a criação da viagem para <span className='font-semibold text-zinc-100'>{destination}</span> nas datas de <span className='font-semibold text-zinc-100'>{displayedDate}</span> preencha seu dados abaixo:
                    </p>
                </div>

                <form onSubmit={handleCreateTrip} className='space-y-3'>
                    <div className='px-2.5 h-14 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                        <User className='text-zinc-400 size-5' />
                        <input onChange={event => setOwnerName(event.target.value)} type="text" name='name' placeholder="Seu nome completo" className='bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1' />
                    </div>

                    <div className='px-2.5 h-14 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                        <AtSign className='text-zinc-400 size-5' />
                        <input onChange={event => setOwnerEmail(event.target.value)} type="email" name='email' placeholder="Seu e-mail pessoal" className='bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1' />
                    </div>

                    <Button size='full' type="submit">
                        <Plus className='size-5' />
                        Confirmar criação da viagem
                    </Button>
                </form>
            </div>
        </div>
    )
}