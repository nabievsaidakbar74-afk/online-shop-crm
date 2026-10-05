import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useOrderDetail from '../hooks/useOrderDetail';
import useOrderNotesDetail from '../hooks/useOrderNotesUpdate';

export default function OrderNotesUpdate({ SectionTitle }: { SectionTitle: any }) {

    const { id } = useParams<{ id: string }>();

    const { data, isLoading } = useOrderDetail(id || null)
    const { updateOrderNotes, isPending } = useOrderNotesDetail();
    const [isEditing, setIsEditing] = useState(false);

    const currentNote = data?.data?.data?.notes;

    // Boshlang'ich qiymat sifatida bo'sh string beramiz
    const [notes, setNotes] = useState("");

    // currentNote o'zgarganda (API'dan data kelganda) state'ni update qilamiz
    useEffect(() => {
        if (currentNote !== undefined && currentNote !== null) {
            setNotes(currentNote);
        }
    }, [currentNote]);


    // Saqlash tugmasi uchun handler funksiya
    const handleSave = () => {
        updateOrderNotes(
            { values: notes, id },
            {
                onSuccess: () => {
                    setIsEditing(false);
                },
            }
        );
    };

    if (isLoading) {
        return <div className="p-5 text-sm text-gray-400">Yuklanmoqda...</div>;
    }

    return (

        <div className="p-5">
            <div className="flex items-center justify-between">
                <SectionTitle icon="bi-chat-left-text" title="Notes" />
                {!isEditing && (
                    <button
                        onClick={() => {
                            setNotes(currentNote || "");
                            setIsEditing(true);
                        }}
                        className="text-gray-500 hover:text-blue-500 transition-colors p-1"
                        title="Tahrirlash"
                    >
                        <i className="bi bi-pencil"></i>
                    </button>
                )}
            </div>

            {
                isEditing ? (
                    <div className="mt-4 flex flex-col gap-2">
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            disabled={isPending}
                            className="w-full rounded-md border border-gray-300 dark:border-slate-600 bg-transparent p-2 text-sm text-gray-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                            rows={3}
                            placeholder="Izoh kiriting..."
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                disabled={isPending}
                                onClick={() => {
                                    setNotes(currentNote || "");
                                    setIsEditing(false);
                                }}
                                className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200 disabled:opacity-50"
                            >
                                Bekor qilish
                            </button>
                            <button
                                disabled={isPending}
                                onClick={handleSave}
                                className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-1"
                            >
                                {isPending ? "Saqlanmoqda..." : "Saqlash"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
                        {currentNote || "Izoh yo'q"}
                    </p>
                )
            }
        </div >
    )
}