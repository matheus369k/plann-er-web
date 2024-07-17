import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";

export function TripDetailsPage() {
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)

    function handleOpenCreateActivityModal() {
        setIsCreateActivityModalOpen(true)
    }

    function handleCloseCreateActivityModal() {
        setIsCreateActivityModalOpen(false)
    }

    return (
        <div className='max-w-6xl px-6 py-10 mx-auto flex flex-col gap-8'>
            <DestinationAndDateHeader />

            <main className="flex gap-16 px-4">
                <Activities handleOpenCreateActivityModal={handleOpenCreateActivityModal} />

                <div className="w-80 space-y-6">
                    <ImportantLinks />

                    <div className='w-full h-px bg-zinc-800' />

                    <Guests />
                </div>
            </main>

            {isCreateActivityModalOpen && (
                <CreateActivityModal handleCloseCreateActivityModal={handleCloseCreateActivityModal} />
            )}
        </div>
    )
}
