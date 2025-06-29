import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl mt-4">
      <div className="navbar bg-base-100 py-2">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <img src="images/logo.png" alt="" className="max-h-[80px]" />
          </div>
        </div>
        <div className="flex-none">
          <div className="flex space-x-4">
            <a
              href="/about"
              className="btn btn-link link-hover text-xl font-light"
            >
              О нас
            </a>
            <a
              href="/services"
              className="btn btn-link link-hover text-xl font-light"
            >
              Услуги
            </a>
            <a
              href="/contacts"
              className="btn btn-link link-hover text-xl font-light"
            >
              Контакты
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
