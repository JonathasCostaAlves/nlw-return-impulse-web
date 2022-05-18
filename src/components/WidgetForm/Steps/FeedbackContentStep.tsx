import { FeedbackType, feedbacktypes } from ".."
import { ArrowLeft, Camera } from 'phosphor-react'
import { CloseButton } from "../../CloseButton"
import { ScreenShotButton } from "../ScreenShotButton";
import { FormEvent, useState } from "react";
import { api } from "../../../lib/api";
import { Loading } from "../Loading";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestarRequested: ()=> void
    onfeedbackSend: ()=> void
}

export function FeedbackContentStep(
    { feedbackType,
      onFeedbackRestarRequested,
      onfeedbackSend
    }: FeedbackContentStepProps
    
    ){

    const [screenshot, setscreenshot ] = useState<string | null>(null)
    const [comment, setComment] = useState('')
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)

    
    const feedbackTypeInfo = feedbacktypes[feedbackType]

    async function handleSubmiteFeedback(event:FormEvent){
        event.preventDefault()
        // console.log({screenshot, comment})

        setIsSendingFeedback(true)
        
        
        await api.post('feedbacks', {
            type: feedbackType,
            comment, 
            screenshot
        })
        
        setIsSendingFeedback(false)
        
        onfeedbackSend()
    }
    
    return (
        <>
         <header >
                <button 
                type="button" 
                className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                onClick={onFeedbackRestarRequested}
                >

                    <ArrowLeft weight="bold" className="w4 h-4"/>
                </button>
                <span className="text-xl leading-6 flex gap-2">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6"/>
                    {feedbackTypeInfo.title}
                </span>
               < CloseButton />
            </header>

            <form 
            onSubmit={handleSubmiteFeedback} 
            className="my-4 w-full" >
                <textarea 
                onChange={ event => setComment(event.target.value) }
                className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500,  resize-none    scrollbar-thumb-zinc-700 scrollbar-transparent scrollbar-thin focus:ring-brand-500 focus:outline-none focus:ring-1  focus:border-brand-500"
                placeholder="Conte com detalhes o que esta acontecendo ..."
                />
            
            <footer className="flex gap-2 mt-2 w-full">

               <ScreenShotButton 
                screenshot = {screenshot}
                onScreenshotTook = {setscreenshot}
               />

                <button
                type="submit"
                disabled={comment.length === 0 || isSendingFeedback}
                className="p-2 bg-brand-500 rounded-md border-transparent  flex-1 flex  justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500"

                >
                   {isSendingFeedback ? <Loading /> : ' Enviar Feedback'}
                </button>
                
            </footer>
            </form>
        </>
    )
}