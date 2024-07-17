import { AtSign, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

type InviteNewParticipantProps = { handleCloseManageGuests: () => void }

export function InviteNewParticipant({ handleCloseManageGuests }: InviteNewParticipantProps) {
    const {tripId} = useParams()

    async function handleInvideNewEmail(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const email = data.get('email')

        await api.post(`/trips/${tripId}/invites`, {
            email,
        })
        
        handleCloseManageGuests()

        window.location.reload()
    }

    return (
        <>
            <div className='space-y-2'>
                <h2 className='font-semibold text-lg text-center'>Convidar uma nova pessoa</h2>

                <p className='text-sm text-zinc-400 text-left'>
                    O convidado ira receber um e-mail para confirmar a participação na viagem.
                </p>
            </div>

            <form onSubmit={handleInvideNewEmail} className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                <div className='px-2 flex items-center flex-1 gap-2'>
                    <AtSign className='text-zinc-400 size-5' />
                    <input type="email" name='email' placeholder="Digite o e-mail do novo convidado" className='bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1' />
                </div>
                <Button type="submit">
                    <Plus className='size-5' />
                    Convidar
                </Button>
            </form>
        </>
    )
}