import { Plus, CircleCheck } from "lucide-react"
import { Button } from "../../components/button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../../lib/axios"
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface GuestsProps {
    handleOpenCreateActivityModal: () => void
}

interface ActivitiesType {
    date: string
    activities: {
        id: string
        title: string
        occurs_at: string
    }[]
}

export function Activities({
    handleOpenCreateActivityModal,
}: GuestsProps) {
    const [activities, setActivities] = useState<ActivitiesType[]>([])
    const { tripId } = useParams()

    useEffect(() => {
        api.get(`/trips/${tripId}/activities`)
            .then(response => {
                setActivities(response.data.activities)
            })
    }, [tripId])

    return (
        <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold">Atividades</h2>

                <Button onClick={handleOpenCreateActivityModal} type="submit">
                    <Plus className='size-5' />
                    Cadastra atividade
                </Button>
            </div>

            <div className="space-y-8">
                {activities?.map(activity => {
                    return (
                        <div key={activity.date} className="space-y-2.5">
                            <div className="flex gap-2 items-baseline">
                                <span className="text-xl text-zinc-300 font-semibold">Dia {format(activity.date, "d", { locale: ptBR })}</span>
                                <span className="text-xs text-zinc-500">{format(activity.date, "EEE", { locale: ptBR })}</span>
                            </div>

                            {activity.activities.length > 0 ?
                                activity.activities.map(dayActivity => {
                                    return (
                                        <div key={dayActivity.id} className="space-y-2.5">
                                            <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                                                <CircleCheck className="size-5 text-lime-300" />
                                                <span className="text-zinc-100 ">{dayActivity.title}</span>
                                                <span className="text-zinc-400 ml-auto">
                                                    {format(dayActivity.occurs_at, "HH:MM", { locale: ptBR })}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                }) : (
                                    <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
                                )
                            }
                        </div>
                    )
                })}
            </div>
        </div >
    )
}