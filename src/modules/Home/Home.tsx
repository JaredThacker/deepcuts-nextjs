"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { RecordDisplay } from "../RecordDisplay/RecordDisplay";
import { useQuery } from "react-query";
import { History } from "@/types/api/History";
import { UserHistory } from "../UserHistory/UserHistory";
import { HistoryWithRecord } from "@/types/api/dto/HistoryWithRecord";
import { HistoryRecordCount } from "@/types/api/dto/HistoryRecordCount";
import ms from "ms";

export const Home = () => {
    const router = useRouter();
    const { data: history } = useQuery({
        queryKey: ["historyData"],
        queryFn: async () => {
            const historyData = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/history`,
            );
            const historyJson = await historyData.json();
            return historyJson as HistoryWithRecord[];
        },
    });

    const { data: historyRecordCount } = useQuery({
        queryKey: ["historyRecordCount"],
        queryFn: async () => {
            const historyRecordCount = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/history/record/count`,
            );

            const historyRecordCountJson =
                (await historyRecordCount.json()) as HistoryRecordCount;

            return historyRecordCountJson;
        },
        refetchInterval: ms("1m"),
    });

    if (history === undefined || historyRecordCount === undefined) {
        return <span />;
    }

    const { count } = historyRecordCount;

    return (
        <div className="grow flex flex-row p-4 gap-4 animate-fadeIn">
            <div className="h-full border grow border-gray-500 rounded">
                <div className="h-fit w-11/12 m-8 flex flex-col items-center border grow border-blue-200 rounded">
                    <span className="flex flex-col items-center font-bold mb-1">
                        {"Record of the Week"}
                    </span>

                    <div>
                        <a
                            href="https://www.discogs.com/release/4312273-Atoms-For-Peace-Amok"
                            rel="noreferrer"
                            target="_blank"
                        >
                            <img
                                src="https://i.discogs.com/mcIh1A6HEAVQ0pCwZ1mnLqxREjgwikqQijZafZMZ5uI/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQzMTIy/NzMtMTM2MTUyOTY1/OS0zMzUzLmpwZWc.jpeg"
                                width={300}
                                height={300}
                                className="hover:outline outline-primary hover:cursor-pointer"
                            ></img>
                        </a>
                    </div>
                    <span className="flex flex-col items-center mt-1">
                        Atoms For Peace - Amok (2013){" "}
                        <span>Genre: Electronic, Rock</span>
                        <span className="mb-1">
                            Style: IDM, Indie Rock, Glitch, Experimental
                        </span>
                    </span>
                </div>

                <div className="h-fit w-11/12 m-8 flex flex-col items-center border grow border-gray-300 rounded">
                    <div className="stats shadow">
                        <div className="stat font-semibold">
                            <div className="stat-title">Total Randomizes</div>
                            <div className="stat-value flex flex-col items-center text-primary">
                                {count}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-fit w-11/12 m-8 flex flex-col items-center grow">
                    <button
                        className="btn btn-primary btn-ghost btn-outline btn-block h-56 text-2xl hover:outline"
                        onClick={() => {
                            router.push("/random");
                        }}
                    >
                        {"Discover Some New Gems"}
                    </button>
                </div>
            </div>
            <div className="h-full border grow border-green-500 rounded w-1/3">
                <div className="h-fit w-11/12 m-8 flex flex-col items-center border grow font-semibold border-green-400 rounded">
                    {"History"}
                    {history.map((eachHistory) => (
                        <UserHistory
                            key={eachHistory.id}
                            history={eachHistory}
                        />
                    ))}
                </div>
                {/* <div className="h-fit w-11/12 m-8 flex flex-col items-center border grow border-green-200 rounded">
                    Favorites
                </div> */}
            </div>
        </div>
    );
};
