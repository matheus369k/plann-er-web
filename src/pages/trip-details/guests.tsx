import { ArrowRightLeft, CircleCheck, CircleDashed, UserCog, X } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { InviteNewParticipant } from "./invite-new-participant";
import { ParticipantConfirm } from "./participant-confirm";

interface ParticipantType {
    id: string
    name: string | null
    email: string
    is_confirmed: boolean
}

export function Guests() {
    const { tripId } = useParams()

    const [isOpenManageGuestsModal, setIsOpenManageGuestsModal] = useState(false)
    const [toggleGuestsConfirmToInvideGuests, setToggleGuestsConfirmToInvideGuests] = useState(false)

    const [participants, setParticipants] = useState<ParticipantType[]>([])

    useEffect(() => {
        api.get(`/trips/${tripId}/participants`)
            .then(response => {
                setParticipants(response.data.participants)
            })
    }, [tripId])

    function handleCloseManageGuests() {
        setIsOpenManageGuestsModal(false)
    }

    function handleOpenManageGuests() {
        setIsOpenManageGuestsModal(true)
    }

    function handleToggleGuestsConfirmToInvideGuests() {
        setToggleGuestsConfirmToInvideGuests((state) => {
            return !state
        })
    }

    function findParticipantIdForEmail(email: string) {
        const participant = participants.find(participant => {
            if (participant.email === email) {
                return participant
            }
        })

        return participant?.id
    }

    return (
        <div className="flex flex-col gap-6">
            <h2 className="font-semibold text-xl">Convidados</h2>

            {participants.map((participant, index) => {
                return (
                    <div key={participant.id} className="flex items-center justify-between gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <span className="font-medium text-zinc-100">{participant.name || 'Convidado Nª' + index}</span>
                            <span className="text-sm text-zinc-400 truncate">
                                {participant.email}
                            </span>
                        </div>

                        {participant.is_confirmed ? (
                            <CircleCheck className="text-green-400 size-5 shrink-0" />
                        ) : (
                            <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                        )
                        }
                    </div>
                )
            })}

            <Button onClick={handleOpenManageGuests} type='button' variant="secondary" size="full">
                <UserCog className='size-5' />
                Gerenciar convidados
            </Button>

            {isOpenManageGuestsModal && (
                <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
                    <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                        <div className='flex items-center justify-between'>
                            <button className="flex gap-2 items-center" onClick={handleToggleGuestsConfirmToInvideGuests} type="button">
                                <ArrowRightLeft className='size-5 text-zinc-100' />
                                <span className="text-zinc-100 font-semibold">
                                    Trocar
                                </span>
                            </button>

                            <button onClick={handleCloseManageGuests} type="button">
                                <X className='size-5 text-zinc-400' />
                            </button>
                        </div>
                        {toggleGuestsConfirmToInvideGuests ? (
                            <>
                                <ParticipantConfirm
                                    handleCloseManageGuests={handleCloseManageGuests}
                                    findParticipantIdForEmail={findParticipantIdForEmail}
                                />
                            </>
                        ) : (
                            <>
                                <InviteNewParticipant
                                    handleCloseManageGuests={handleCloseManageGuests}
                                />
                            </>
                        )}

                    </div>
                </div>
            )}
        </div>
    )
}
