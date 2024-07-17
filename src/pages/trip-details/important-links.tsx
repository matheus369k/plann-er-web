import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { CreateImportantLinks } from "./create-important-links";

interface LinkType {
    id: string
    title: string
    url: string
}

export function ImportantLinks() {
    const [links, setLinks] = useState<LinkType[]>([])
    const { tripId } = useParams()

    const [isOpenImportantLInksModal, setOpenIsImportantLinksModal] = useState(false)

    useEffect(() => {
        api.get(`/trips/${tripId}/links`)
            .then(response => {
                setLinks(response.data.links)
            })
    }, [tripId])

    function handleOpenImportLinksModal() {
        setOpenIsImportantLinksModal(true)
    }

    function handleCloseImportLinksModal() {
        setOpenIsImportantLinksModal(false)
    }

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links importantes</h2>

            {links.map(link => {
                return (
                    <div key={link.id} className="flex items-center justify-between gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <span className="font-medium text-zinc-100">{link.title}</span>
                            <a target="_blank" href={link.url} className="text-xs text-zinc-400 truncate hover:text-zinc-200">
                                {link.url}
                            </a>
                        </div>

                        <Link2 className="text-zinc-400 size-5 shrink-0" />
                    </div>
                )
            })}

            <Button onClick={handleOpenImportLinksModal} type='button' size="full" variant="secondary">
                <Plus className='size-5' />
                Cadastrar novo link
            </Button>

            {isOpenImportantLInksModal && (
                <CreateImportantLinks handleCloseImportLinksModal={handleCloseImportLinksModal} />
            )}
        </div>
    )
}