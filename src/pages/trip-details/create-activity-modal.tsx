import { Calendar, Tag, X } from "lucide-react"
import { Button } from "../../components/button"
import { FormEvent } from "react"
import { api } from "../../lib/axios"
import { useParams } from "react-router-dom"

interface CreateActivityModalProps {
    handleCloseCreateActivityModal: () => void
}

export function CreateActivityModal({
    handleCloseCreateActivityModal,

}: CreateActivityModalProps) {
    const { tripId } = useParams()

    async function handleCreateActivity(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        const title = data.get('title')?.toString()
        const occurs_at = data.get('occurs_at')?.toString()

        if (!title || title.length < 4) {
            return
        }

        if (!occurs_at) {
            return
        }

        await api.post(`/trips/${tripId}/activities`, {
            title,
            occurs_at,
        })

        handleCloseCreateActivityModal()

        window.location.reload()
    }

    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-semibold text-lg'>Cadastrar atividade</h2>

                        <button onClick={handleCloseCreateActivityModal} type="button">
                            <X className='size-5 text-zinc-400' />
                        </button>
                    </div>

                    <p className='text-sm text-zinc-400 text-left'>
                        Todos os convidados podem visualizar as atividades
                    </p>
                </div>

                <form onSubmit={handleCreateActivity} className='space-y-3'>
                    <div className='px-2.5 h-14 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                        <Tag className='text-zinc-400 size-5' />
                        <input type="text" name='title' placeholder="Qual a atividade?" className='bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1' />
                    </div>


                    <div className='px-2.5 h-14 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                        <Calendar className='text-zinc-400 size-5' />
                        <input type="datetime-local" name='occurs_at' placeholder="data e horário da atividade" className='bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1' />
                    </div>


                    <Button size="full" type="submit">
                        Salvar atividade
                    </Button>
                </form>
            </div>
        </div>
    )
}