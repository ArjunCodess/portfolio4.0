import GuestbookForm from "@/components/guestbook-form";
import { Suspense } from "react";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center p-12">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    Giridhar&apos;s Guestbook
                </p>
            </div>

            <div className="relative w-full max-w-2xl my-12">
                <h1 className="relative font-semibold dark:drop-shadow-[0_0_0.3rem_#ffffff70] text-2xl mb-8 tracking-tighter">
                    Sign my guestbook
                </h1>
                <Suspense fallback={<p>loading...</p>}>
                    <GuestbookForm />
                    {/* <GuestbookEntries /> */}
                </Suspense>
            </div>
        </main>
    );
}