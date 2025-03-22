import { PhoneCall } from "lucide-react"

function Connect() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#4A4A4A] ml-5 mt-10 mb-8">Connect</h1>

            <div className="">
                <button className="bg-white text-[#4A4A4A] text-xl ml-5 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2">
                    <PhoneCall className="h-5 w-5 mr-3" />
                    Initiate a call
                </button>
            </div>
        </div>
    )
}

export default Connect

