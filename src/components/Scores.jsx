function Scores(props) {

    const scores = props.scoreList
    if (props.loaded) return <div className="mx-[10%] my-12">Loading...</div>
    if (props.err) return <div className="mx-[10%] my-12">{props.err}</div>

    return (
        <div className="mx-[10%] my-12">
            <h3 className="font-bold text-xl">High Scores</h3>

            <div className="mt-4 scoreGrid grid grid-cols-3 gap-2 rounded overflow-hidden outline outline-1 outline-offset-2 outline-slate-400">
                <div>
                    <h4 className="text-center font-medium bg-slate-300">Beginner Highscores</h4>

                    <div className="flex flex-row justify-between px-12 bg-slate-200">
                            <span>RANK</span>
                            <span>NAME</span>
                            <span>TIME</span>
                        </div>

                    {scores["top10Beg"].map((obj, i) =>(
                        <div key={i} className="flex flex-row justify-between px-12">
                            <span >{i + 1}</span>
                            <span className="uppercase">{obj.name}</span>
                            <span >{obj.points}</span>
                        </div>
                    ))}

                </div>
                <div>
                    <h4 className="text-center font-medium bg-slate-300">Intermediate Highscores</h4>

                    <div className="flex flex-row justify-between px-12 bg-slate-200">
                            <span>RANK</span>
                            <span>NAME</span>
                            <span>TIME</span>
                        </div>

                    {scores["top10Int"].map((obj, i) =>(
                        <div key={i} className="flex flex-row justify-between px-12">
                            <span>{i + 1}</span>
                            <span className="uppercase">{obj.name}</span>
                            <span>{obj.points}</span>
                        </div>
                    ))}

                </div>
                <div>
                <h4 className="text-center font-medium bg-slate-300">Expert Highscores</h4>

                <div className="flex flex-row justify-between px-12 bg-gray-200">
                        <span>RANK</span>
                        <span>NAME</span>
                        <span>TIME</span>
                    </div>

                    {scores["top10Exp"].map((obj, i) =>(
                        <div key={i} className="flex flex-row justify-between px-12">
                            <span>{i + 1}</span>
                            <span className="uppercase">{obj.name}</span>
                            <span>{obj.points}</span>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Scores