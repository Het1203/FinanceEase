import { PhoneCall } from "lucide-react"

function Connect() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-[#4A4A4A]">Connect</h1>

            <div className="flex justify-center items-center h-[60vh]">
                <button className="bg-white text-[#4A4A4A] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2">
                    <PhoneCall className="h-5 w-5" />
                    Initiate a call
                </button>
            </div>
        </div>
    )
}

export default Connect

