import { FormEvent, useState } from 'react'
import { InvideGuestsModal } from './invite-guests-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestsStep } from './steps/invite-guests-step'
import { DateRange } from 'react-day-picker'
import { api } from '../../lib/axios'
import { useNavigate } from 'react-router-dom'

export function CreateTripPage() {
    const navigate = useNavigate()

    const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
    const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
    const [isConfirmTripOpen, setIsConfirmTripOpen] = useState(false)

    const [destination, setDestination] = useState('')
    const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()
    const [ownerName, setOwnerName] = useState('')
    const [ownerEmail, setOwnerEmail] = useState('');
    const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

    function handleOpenGuestsInput() {
        if (destination.length < 4) {
            return
        }

        if (!eventStartAndEndDates) {
            return
        }

        setIsGuestsInputOpen(true)
    }

    function handleCloseGuestsInput() {
        setIsGuestsInputOpen(false)
    }

    function handleOpenGuestsModal() {
        setIsGuestsModalOpen(true)
    }

    function handleCloseGuestsModal() {
        setIsGuestsModalOpen(false)
    }

    function handleOpenConfirmTripModal() {
        if (emailsToInvite.length < 1) {
            return
        }

        setIsConfirmTripOpen(true)
    }

    function handleCloseConfirmTripModal() {
        setIsConfirmTripOpen(false)
    }

    function handleAddNewEmailToInvide(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const email = data.get('email')?.toString()

        if (!email || email.length < 0) {
            return
        }

        if (emailsToInvite.includes(email)) {
            return
        }

        setEmailsToInvite([
            ...emailsToInvite,
            email,
        ])

        event.currentTarget.reset();
    }

    function handleRemoveEmailFromInvite(emailToRemove: string) {
        const emailInviteList = emailsToInvite.filter(email => email !== emailToRemove)

        setEmailsToInvite(emailInviteList)
    }

    async function handleCreateTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!destination) {
            return
        }
        if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
            return
        }
        if (emailsToInvite.length === 0) {
            return
        }
        if (!ownerName || !ownerEmail) {
            return
        }

        const response = await api.post('/trips', {
            destination,
            starts_at: eventStartAndEndDates.from,
            ends_at: eventStartAndEndDates.to,
            owner_name: ownerName,
            owner_email: ownerEmail,
            emails_to_invite: emailsToInvite

        })

        const { tripId } = await response.data

        navigate(`/plann-er-web/trips/${tripId}`)
    }

    return (
        <div className='h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center'>
            <div className='max-w-3xl w-full px-6 text-center space-y-10'>
                <div className='flex flex-col items-center gap-3'>
                    <img src='/logo.svg' alt="plann.er" />
                    <p className='text-zinc-300 text-lg'>Convide seus amigos e planeje sua próxima viagem!</p>
                </div>

                <div className='space-y-4'>
                    <DestinationAndDateStep
                        isGuestsInputOpen={isGuestsInputOpen}
                        handleCloseGuestsInput={handleCloseGuestsInput}
                        handleOpenGuestsInput={handleOpenGuestsInput}
                        setDestination={setDestination}
                        setEventStartAndEndDates={setEventStartAndEndDates}
                        eventStartAndEndDates={eventStartAndEndDates}
                    />

                    {isGuestsInputOpen && (
                        <InviteGuestsStep
                            handleOpenGuestsModal={handleOpenGuestsModal}
                            emailsToInvite={emailsToInvite}
                            handleOpenConfirmTripModal={handleOpenConfirmTripModal}
                        />
                    )}
                </div>

                <p className='text-zinc-500 text-sm'>
                    Ao planejar sua viagem pela plann.er você automaticamente concorda <br /> com nossos <a className='text-zinc-300 underline' href="#">termos de uso</a> e <a className='text-zinc-300 underline' href="#">politicas de privacidade</a>.
                </p>

                {isGuestsModalOpen && (
                    <InvideGuestsModal
                        handleCloseGuestsModal={handleCloseGuestsModal}
                        emailsToInvite={emailsToInvite}
                        handleRemoveEmailFromInvite={handleRemoveEmailFromInvite}
                        handleAddNewEmailToInvide={handleAddNewEmailToInvide}
                    />
                )}

                {isConfirmTripOpen && (
                    <ConfirmTripModal
                        handleCloseConfirmTripModal={handleCloseConfirmTripModal}
                        handleCreateTrip={handleCreateTrip}
                        setOwnerName={setOwnerName}
                        setOwnerEmail={setOwnerEmail}
                        eventStartAndEndDates={eventStartAndEndDates}
                        destination={destination}
                    />
                )}
            </div>
        </div>
    )
}