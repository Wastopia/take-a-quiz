import './Answer.css'

export default function FinishMessage() {
  return (
    <div className='finish-message'>
      <div className='flex flex-col items-center justify-center'>
        <h3>Test is Over!</h3>
        <p>
          Thank you for participating in the test!
        </p>
      </div>
      
      <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>
        <a href='https://waste2earn.xyz'>
          Return to the main page
        </a>
      </button>
       
    </div>
  )
}
