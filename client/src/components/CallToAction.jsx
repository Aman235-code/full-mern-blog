import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="mb-10 flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about javascript?</h2>
        <p className="text-gray-500 my-2">
          Checkout these resources with 100 js projects
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferer"
          >
            100 Javascript Projects
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcode.visualstudio.com%2Fassets%2Fdocs%2Flanguages%2Fjavascript%2Foverview.png&f=1&nofb=1&ipt=fcf2d0643c27b59b7def29c0220fe6e1b0aa47497e69a1e49607258253cfc98e&ipo=images"
          alt=""
        />
      </div>
    </div>
  );
}
