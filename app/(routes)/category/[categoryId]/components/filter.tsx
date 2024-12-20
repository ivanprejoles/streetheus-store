"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Color, Size } from "@/types";
import qs from "query-string";
import {Button} from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterProps {
    data: (Size | Color)[];
    name: string;
    valueKey: string;
}

const Filter: React.FC<FilterProps> = ({
    data,
    name,
    valueKey
}) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const selectedValue = searchParams.get(valueKey);

    const onClick = (id: string) => {
        const current = qs.parse(searchParams.toString());

        const query = {
            ...current,
            [valueKey]: id
        }

        if (current[valueKey] === id) {
            query[valueKey] = null;
        }

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, { skipNull: true })

        router.push(url);
    }

    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold text-black">
                {name}
            </h3>
            <hr className="my-4" />
            <div className="flex flex-wrap gap-2">
                {data.map((filter) => (
                    <div key={filter.id} className="flex items-center">
                        <Button
                            variant="biege"
                            className={cn(
                                "rounded-md text-sm p-2 text-white hover:bg-gradient-to-r from-[#D2B48C] to-[#EEDC82] border-gray-300 hover:text-white",
                                selectedValue === filter.id && " from-[#D2B48C] to-[#EEDC82] text-white bg-gradient-to-r"
                            )}
                            onClick={() => onClick(filter.id)}
                        >
                            {filter.name}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default Filter