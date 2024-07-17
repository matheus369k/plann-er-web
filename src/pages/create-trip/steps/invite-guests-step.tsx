import { ArrowRight, UserRoundPlus } from 'lucide-react'
import { Button } from '../../../components/button'

interface InviteGuestsStepProps {
    handleOpenGuestsModal: ()=> void
    emailsToInvite: string[]
    handleOpenConfirmTripModal: ()=> void
}

export function InviteGuestsStep({ 
    emailsToInvite,
    handleOpenConfirmTripModal,
    handleOpenGuestsModal
}: InviteGuestsStepProps) {
    return (
        <div className='h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3 shadow-shape'>
            <button type='button' onClick={handleOpenGuestsModal} className='flex items-center flex-1 gap-2'>
                <UserRoundPlus className='size-5 text-zinc-400' />
                {emailsToInvite.length > 0 ? (
                    <span className='text-lg text-zinc-100 outline-none flex-1 text-left'>
                        {emailsToInvite.length} pessoa(s) convidada(s)
                    </span>
                ) : (
                    <span className='text-lg text-zinc-400 outline-none flex-1 text-left'>
                        Quem estará na viagem?
                    </span>
                )}
            </button>

            <div className='w-px h-6 bg-zinc-800' />

            <Button onClick={handleOpenConfirmTripModal} type="submit">
                Confirmar viagem
                <ArrowRight className='size-5' />
            </Button>
        </div>
    )
}