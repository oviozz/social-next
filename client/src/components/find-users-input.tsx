"use client";
import {Input} from "@/components/ui/input";
import {ChangeEvent, useEffect, useState} from "react";
import {SearchIcon} from "lucide-react";

export default function FindUsersInput(){

    const [searchInput, setSearchInput] = useState("");
    const [debounceInput, setDebounceInput] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchInput(value);
    }

    useEffect(() => {
        const interval = setTimeout(() => {
            setDebounceInput(searchInput);
            console.log("hello")
        }, 500);

        return () => clearTimeout(interval);
    }, [searchInput])

    return (
        <div className={"relative"}>
            <div className={"relative"}>
                <Input
                    autoComplete={"off"}
                    className={"pl-8"}
                    onChange={onChangeHandler}
                    value={searchInput}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={"Search..."}
                />

                <SearchIcon className={"size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2"}/>
            </div>

            <div className={"absolute mt-2 w-full"}>
                { isFocused && (
                    <div className={"h-fit border rounded-md bg-white p-3"}>
                        { !searchInput ? (
                            <p>Try searching for people or keys</p>
                        ) : (
                            <div className={"flex justify-center items-center"}>
                                {debounceInput}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )

}