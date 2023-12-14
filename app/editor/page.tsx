const Page = () => {
  return (
    <div className="p-4 [&>*]:mb-4">
      <div className="p-4 flex flex-col gap-4 bg-2 rounded-md shadow-md">
        <div className="p-2 bg-3 rounded-md" contentEditable>hello</div>
        <div className="p-2 bg-3 rounded-md" contentEditable>hello</div>
        <div className="p-2 bg-3 rounded-md" contentEditable>hello</div>
        <div className="p-2 bg-3 rounded-md" contentEditable>hello</div>
        <button className="mx-auto p-1 w-fit bg-3 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <ActionBar />
    </div>
  );
}

export default Page;

const ActionBar = () => {
  return (
    <div className="flex gap-4">
      <button className="p-2 flex gap-2 bg-main hover:bg-main-hover text-white rounded-md">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
        </svg>
        <p>実行</p>
      </button>
      <button className="p-2 flex gap-2 bg-2 hover:bg-2-hover rounded-md shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
        </svg>
        <p>保存</p>
      </button>
    </div>
  );
}