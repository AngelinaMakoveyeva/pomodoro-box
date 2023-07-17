import React, { createContext, useState } from "react";

type CurrentContextType = {
	currentTask: number
	setCurrentTask: React.Dispatch<React.SetStateAction<number>>
}

const ICurrentContextState = {
	currentTask: 0,
	setCurrentTask: () => { }
}

export const currentContext = createContext<CurrentContextType>(ICurrentContextState);

export function CurrentContextProvider({ children }: { children: React.ReactNode }) {
	const [currentTask, setCurrentTask] = useState(0);

	return (
		<currentContext.Provider value={{ currentTask, setCurrentTask }}>
			{children}
		</currentContext.Provider>
	)
}
