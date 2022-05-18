import { useState } from "react"

import { CloseButton } from "../CloseButton"


import bugImgUrl from '../../assets/Bug.svg'
import ideaImgUrl from '../../assets/Idea.svg'
import thouhtImgUrl from '../../assets/Thought.svg'
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep"
import { FeedbackContentStep } from "./Steps/FeedbackContentStep"
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep"


export const feedbacktypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImgUrl,
            alt: 'Imagem de um inseto'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImgUrl,
            alt: 'Imagem de uma lampada'
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: thouhtImgUrl,
            alt: 'Imagem de um balão de pensamento'
        }
    }
}

export type FeedbackType = keyof typeof feedbacktypes

export function WidgetForm() {

    const [feedbackType, serfeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, serfeedbackSent] = useState(false)


    function handleRestartFeedback() {
        serfeedbackSent(false)
        serfeedbackType(null)
        
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex  flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

            {feedbackSent ? (
                < FeedbackSuccessStep 
                onFeedbackRestarRequested={handleRestartFeedback}
                />
            ) : (
                <>
                    {!feedbackType ? (
                        <FeedbackTypeStep onFeedbackTypeChanged={serfeedbackType} />
                    ) : (

                        <FeedbackContentStep
                            feedbackType={feedbackType}
                            onFeedbackRestarRequested={handleRestartFeedback}
                            onfeedbackSend={() => serfeedbackSent(true)}
                        />
                    )}
                </>
            )}

            <footer className="text-xs text-neutral-400" >
                Feito com ♥ pela  <a className="underline-offset-2" href="https://nextlevelweek.com" target="_blank"> Rocketseat</a>
            </footer>
        </div>
    )
}