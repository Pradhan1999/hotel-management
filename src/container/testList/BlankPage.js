import React from 'react';

function BlankPage() {
  return (
    <main className="w-full h-1/2 flex justify-center">
      <div className="flex justify-center items-center flex-col  pb-36  text-center">
        <img className="mx-auto mb-20" src={require(`../../static/img/pages/404.svg`).default} alt="404" />

        <p className="text-body dark:text-white60 mb-6 text-lg xs:text-base font-medium">Sorry! No Data Found .</p>
      </div>
    </main>
  );
}

export default BlankPage;
