import type { NextPage } from 'next'
import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula, codepenEmbed, github, dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Search: NextPage = () => {

    const [lines, setLines] = React.useState<any[]>([])
    const [selectedLine, setSelectedLine] = React.useState<any>()
    const [searchInput, setSearchInput] = React.useState<string>("");
    const [searchValue, setSearchValue] = React.useState<string>("");
    const [codeString, setCodeString] = React.useState<string>("");

    React.useEffect(() => {
        fetch(`/api/lines?search=${searchValue}`)
            .then((res) => res.json())
            .then((data) => {
                setLines(data);
            })
    }, [searchValue]);

    React.useEffect(() => {
        let debounceTimer = setTimeout(() => {
            setSearchValue(searchInput);
        }, 500);

        return () => {
            clearTimeout(debounceTimer);
        };
    }, [searchInput]);

    React.useEffect(() => {
        if (selectedLine) {
            fetch(`/api/files/${selectedLine.file.data}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCodeString(data.lines.map((line: { content: any; }) => {
                    return line.content;
                }).join("\r\n"))
            })
        }

    }, [selectedLine]);

    return (
        <div>
            <div className="flex flex-row">
                <div className="flex-1 h-[89vh] overflow-scroll overflow-x-hidden pr-2 shadow-2xl" >
                    <div className="p-2 sticky top-0 bg-white border-b-2">
                        <input 
                            type="text" 
                            className="border shadow appearance-none w-full rounded py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:border-blue-300" 
                            placeholder="Search..."
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value);
                            }}
                        />
                    </div>
                    {lines.map((line, index) => {
                        return (
                            <div key={index} className="border-gray-100 border-b py-1 hover:bg-gray-100 hover:cursor-pointer pl-2" onClick={() => setSelectedLine(line)}>
                                <div className="text-sm">{line.content}</div>
                                <div className="text-xs font-thin">{line.file.path}</div>
                            </div>

                        )
                    })}
                </div>

                    <SyntaxHighlighter 
                        language="javascript" 
                        startingLineNumber={1}
                        style={dracula} 
                        showLineNumbers 
                        className="flex-1 h-[89vh] overflow-x-hidden overflow-y-scroll"
                        //style={coy}
                        //showLineNumbers
                        wrapLines
                        lineProps={(lineNumber) => {
                            let style = { display: "block", width: "fit-content", backgroundColor: "" };
                            if (selectedLine.lineNr === lineNumber) {
                                style.backgroundColor = "blue";
                            }
                            return { style };
                        }}
                        >
                        {codeString}
                    </SyntaxHighlighter>

            </div>
        </div>
    )
}

export default Search
