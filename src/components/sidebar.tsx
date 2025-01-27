import Link from "next/link";
import Image from "next/image";
import React from "react";
import logo from "../assets/robinos_islogo.svg";
import { FaWallet } from "react-icons/fa";

function sidebar() {

  const handleRefresh = () => {
    window.location.reload(); // This will reload the page
  };


  return (
    <div className="w-[300px] h-[100vh] relative pt-[20px] pl-[20px] space-y-[px] bg-[#061230] text-white">
      <div className=" h-[110px] ">
        <a href="">
          <Image
            src={logo}
            alt="Robinos logo"
            loading="lazy"
            width="150"
            height="100"
            decoding="async"
            data-nimg="1"
            className="h-[52px] w-auto"
          />
        </a>
      </div>
      <ul className="text-slate-500 text-[18px] font-medium">
        <li className="mb-[40px] hover:text-blue-600 ">
          <Link
            href="/"
            className="hover:text-blue-600 "
            aria-label="versus-events"
            
          >
            <svg
              className="inline mr-[15px] fill-slate-500  hover:fill-blue-600"
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.41724 11.6174V16.7123C2.41724 17.0706 2.30087 17.3785 2.06285 17.6249C1.82483 17.8712 1.5392 18 1.21126 18C0.883323 18 0.581829 17.8768 0.349098 17.6249C0.116366 17.3729 0 17.0706 0 16.7123V1.30451C0 0.957387 0.116366 0.649456 0.354387 0.391913C0.592408 0.13437 0.878034 0 1.21655 0H9.15059C9.43622 0 9.6901 0.106376 9.91755 0.324728C10.145 0.537481 10.2825 0.789424 10.3354 1.06936L10.6263 2.40187H15.7676C16.0955 2.40187 16.3864 2.53064 16.6297 2.79378C16.8731 3.05132 17 3.35925 17 3.70638V12.7092C17 13.0675 16.8783 13.3754 16.6297 13.6218C16.3864 13.8737 16.0955 13.9969 15.7676 13.9969H10.108C9.82234 13.9969 9.56316 13.8961 9.33572 13.7002C9.10828 13.5042 8.96546 13.2635 8.91257 12.9835L8.62165 11.623H2.41724V11.6174Z"></path>
            </svg>
            Versus
          </Link>
        </li>
        <li className="mb-[40px]  ">
          <a
            href="/tokenized"
            aria-label="Tokenized events"
            className="pointer-events-none relative"
          >
            <svg
              className="align-top mt-[5px] inline mr-[15px] fill-slate-500"
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.99745 14.2371L4.65738 16.841C4.44107 16.9636 4.22936 17.0136 4.01765 17C3.80594 16.9864 3.62184 16.9182 3.46076 16.7955C3.29968 16.6728 3.18001 16.5229 3.10177 16.3411C3.02353 16.1593 3.01433 15.9457 3.06495 15.7049L4.21555 10.8289L0.390956 7.52072C0.216065 7.3753 0.0964025 7.20716 0.0411737 7.00722C-0.0186575 6.81181 -0.0140551 6.61187 0.0457761 6.41647C0.0918001 6.22106 0.202258 6.05293 0.381752 5.92114C0.561245 5.78936 0.763751 5.71665 1.00308 5.69848L6.05652 5.26677L8.02174 0.649826C8.10458 0.431703 8.24266 0.26811 8.42675 0.159048C8.61085 0.0499866 8.80415 0 9.00205 0C9.19996 0 9.39326 0.0545309 9.57735 0.159048C9.76145 0.263566 9.89952 0.427158 9.99157 0.649826L11.9614 5.27586L17.0378 5.70756C17.2542 5.7212 17.4475 5.79845 17.627 5.93023C17.8064 6.06202 17.9169 6.22561 17.9629 6.42555C18.0228 6.62096 18.0274 6.8209 17.9675 7.01631C17.9077 7.21171 17.7926 7.38439 17.6178 7.5298L13.7839 10.838L14.9484 15.714C14.9944 15.9548 14.9806 16.1684 14.9023 16.3502C14.8241 16.5319 14.7044 16.6819 14.5433 16.8046C14.3823 16.9273 14.1982 16.9955 13.9865 17.0091C13.7747 17.0227 13.5676 16.9727 13.3605 16.85L9.01126 14.2462L8.99745 14.2371Z"></path>
            </svg>
            Tokenized prediction
            <p className="text-xs absolute right-0 ">(coming soon)</p>
          </a>
        </li>
        <li className="mb-[40px]  ">
          <Link href="/Portfolio">
            
             <p className="flex items-center hover:text-blue-600 gap-x-4"> <FaWallet /> Portfolio</p>
            
          </Link>
        </li>   
        <li className="mb-[40px]">
          <a
            href="https://mino.robinos.finance/"
            aria-label="Mino NFT"
            className="hover:text-blue-600"
            target="_blank"
          >
            <svg
              className="align-top mt-[5px] inline mr-[15px] fill-slate-500 hover:fill-blue-600"
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.27502 18.4065C1.64531 18.4065 1.10871 18.1848 0.665225 17.7413C0.221741 17.2978 0 16.7612 0 16.1315V2.27502C0 1.64531 0.221741 1.10871 0.665225 0.665225C1.10871 0.221742 1.64531 0 2.27502 0H8.06577C8.38497 0 8.65436 0.109784 8.87392 0.32935C9.09349 0.548917 9.20327 0.818308 9.20327 1.13752C9.20327 1.45672 9.09349 1.72611 8.87392 1.94567C8.65436 2.16524 8.38497 2.27502 8.06577 2.27502H2.27502V16.1315H16.1315V10.3408C16.1315 10.0216 16.2413 9.75219 16.4609 9.53263C16.6804 9.31306 16.9498 9.20327 17.269 9.20327C17.5882 9.20327 17.8576 9.31306 18.0772 9.53263C18.2968 9.75219 18.4065 10.0216 18.4065 10.3408V16.1315C18.4065 16.7612 18.1848 17.2978 17.7413 17.7413C17.2978 18.1848 16.7612 18.4065 16.1315 18.4065H2.27502ZM16.1315 3.86035L7.87827 12.1136C7.66704 12.3248 7.40382 12.4295 7.0886 12.4275C6.77338 12.4255 6.51016 12.3189 6.29892 12.1076C6.08769 11.8964 5.98208 11.6322 5.98208 11.3149C5.98208 10.9978 6.08769 10.7335 6.29892 10.5223L14.5462 2.27502H12.3408C12.0216 2.27502 11.7522 2.16524 11.5326 1.94567C11.3131 1.72611 11.2033 1.45672 11.2033 1.13752C11.2033 0.818308 11.3131 0.548917 11.5326 0.32935C11.7522 0.109784 12.0216 0 12.3408 0H18.4065V6.06577C18.4065 6.38497 18.2968 6.65436 18.0772 6.87392C17.8576 7.09349 17.5882 7.20327 17.269 7.20327C16.9498 7.20327 16.6804 7.09349 16.4609 6.87392C16.2413 6.65436 16.1315 6.38497 16.1315 6.06577V3.86035Z"></path>
            </svg>
            MinoNFT
          </a>
        </li>
        <li className="mb-[40px]">
          <a
            href="https://swapsicle.io/"
            className="hover:text-blue-600"
            aria-label="Swapsicle"
            target="_blank"
          >
            <svg
              className="align-top mt-[5px] inline mr-[15px] fill-slate-500 hover:fill-blue-600"
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.27502 18.4065C1.64531 18.4065 1.10871 18.1848 0.665225 17.7413C0.221741 17.2978 0 16.7612 0 16.1315V2.27502C0 1.64531 0.221741 1.10871 0.665225 0.665225C1.10871 0.221742 1.64531 0 2.27502 0H8.06577C8.38497 0 8.65436 0.109784 8.87392 0.32935C9.09349 0.548917 9.20327 0.818308 9.20327 1.13752C9.20327 1.45672 9.09349 1.72611 8.87392 1.94567C8.65436 2.16524 8.38497 2.27502 8.06577 2.27502H2.27502V16.1315H16.1315V10.3408C16.1315 10.0216 16.2413 9.75219 16.4609 9.53263C16.6804 9.31306 16.9498 9.20327 17.269 9.20327C17.5882 9.20327 17.8576 9.31306 18.0772 9.53263C18.2968 9.75219 18.4065 10.0216 18.4065 10.3408V16.1315C18.4065 16.7612 18.1848 17.2978 17.7413 17.7413C17.2978 18.1848 16.7612 18.4065 16.1315 18.4065H2.27502ZM16.1315 3.86035L7.87827 12.1136C7.66704 12.3248 7.40382 12.4295 7.0886 12.4275C6.77338 12.4255 6.51016 12.3189 6.29892 12.1076C6.08769 11.8964 5.98208 11.6322 5.98208 11.3149C5.98208 10.9978 6.08769 10.7335 6.29892 10.5223L14.5462 2.27502H12.3408C12.0216 2.27502 11.7522 2.16524 11.5326 1.94567C11.3131 1.72611 11.2033 1.45672 11.2033 1.13752C11.2033 0.818308 11.3131 0.548917 11.5326 0.32935C11.7522 0.109784 12.0216 0 12.3408 0H18.4065V6.06577C18.4065 6.38497 18.2968 6.65436 18.0772 6.87392C17.8576 7.09349 17.5882 7.20327 17.269 7.20327C16.9498 7.20327 16.6804 7.09349 16.4609 6.87392C16.2413 6.65436 16.1315 6.38497 16.1315 6.06577V3.86035Z"></path>
            </svg>
            Swapsicle
          </a>
        </li>
      </ul>

      <div className="absolute  bottom-[10px] font-medium text-14 text-slate-500">
        <ul className="">
          <li className="mb-[30px]">
            <a
              href="https://robinospredict.notion.site/2dffcd940379462cbc626f6e7dae123e?v=22a28f25af564e9e8d60c8b85e52fad7"
              className="hover:text-blue-600"
              target="_blank"
              aria-label="Documents"
            >
              Docs
            </a>
          </li>
          <li className="mb-[30px]">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:R9jf6la:"
              data-state="closed"
              className="text-left hover:text-blue-600"
            >
              Terms &amp; conditions
            </button>
          </li>
        </ul>
        <div className="mb-[30px]">
          <a
            className="mr-[10px] p-1 hover:bg-blue-600 transition rounded-lg"
            href="https://discord.com/invite/swapsicle"
            target="_blank"
            aria-label="discord"
          >
            <svg
              className="inline"
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.9312 1.82516C15.6346 1.23002 14.2662 0.805649 12.8604 0.562661C12.8476 0.560163 12.8343 0.561803 12.8225 0.567345C12.8106 0.572887 12.8009 0.582043 12.7946 0.593494C12.6196 0.905994 12.4246 1.31349 12.2879 1.63516C10.7724 1.40498 9.23088 1.40498 7.7154 1.63516C7.5633 1.27874 7.39165 0.930994 7.20123 0.593494C7.19467 0.5823 7.18486 0.57336 7.17311 0.567855C7.16135 0.56235 7.14821 0.560539 7.1354 0.562661C5.72944 0.805144 4.36101 1.22954 3.06457 1.82516C3.05359 1.82976 3.04429 1.83762 3.0379 1.84766C0.444567 5.72183 -0.266266 9.50016 0.0829005 13.231C0.0837487 13.2403 0.0864772 13.2492 0.0909192 13.2574C0.0953611 13.2656 0.101423 13.2727 0.108734 13.2785C1.6184 14.397 3.30716 15.2508 5.1029 15.8035C5.11556 15.8072 5.12903 15.8069 5.14153 15.8027C5.15403 15.7986 5.16497 15.7907 5.1729 15.7802C5.55895 15.2556 5.90069 14.6998 6.19457 14.1185C6.19866 14.1105 6.20103 14.1018 6.20151 14.0929C6.20198 14.0839 6.20056 14.075 6.19733 14.0666C6.1941 14.0583 6.18914 14.0507 6.18278 14.0444C6.17641 14.0382 6.16879 14.0333 6.1604 14.0302C5.62159 13.824 5.09995 13.5754 4.6004 13.2868C4.59124 13.2815 4.58354 13.2741 4.57797 13.2651C4.5724 13.2561 4.56914 13.2458 4.56848 13.2353C4.56782 13.2247 4.56978 13.2142 4.57419 13.2045C4.57859 13.1949 4.58531 13.1866 4.59373 13.1802C4.69893 13.1015 4.8023 13.0203 4.90373 12.9368C4.91261 12.9296 4.92331 12.925 4.93464 12.9236C4.94597 12.9221 4.95748 12.9238 4.9679 12.9285C8.24123 14.4227 11.7846 14.4227 15.0196 12.9285C15.0301 12.9236 15.0418 12.9218 15.0533 12.9233C15.0648 12.9248 15.0756 12.9295 15.0846 12.9368C15.1846 13.0185 15.2896 13.1018 15.3954 13.1802C15.4037 13.1865 15.4104 13.1947 15.4148 13.2041C15.4193 13.2136 15.4213 13.224 15.4208 13.2344C15.4203 13.2448 15.4173 13.255 15.412 13.264C15.4067 13.273 15.3993 13.2805 15.3904 13.286C14.892 13.5773 14.3699 13.8259 13.8296 14.0293C13.8212 14.0325 13.8135 14.0375 13.8071 14.0439C13.8008 14.0502 13.7958 14.0579 13.7926 14.0663C13.7894 14.0747 13.788 14.0837 13.7884 14.0927C13.7889 14.1017 13.7913 14.1105 13.7954 14.1185C14.0954 14.7002 14.4387 15.2535 14.8162 15.7793C14.824 15.79 14.8349 15.7981 14.8475 15.8022C14.86 15.8064 14.8736 15.8066 14.8862 15.8027C16.685 15.2517 18.3765 14.3978 19.8879 13.2777C19.8953 13.2725 19.9014 13.2658 19.906 13.258C19.9106 13.2502 19.9135 13.2416 19.9146 13.2327C20.3312 8.91849 19.2162 5.17099 16.9571 1.84933C16.9518 1.83813 16.9426 1.83007 16.9312 1.82516ZM6.68373 10.9585C5.69873 10.9585 4.88623 10.0543 4.88623 8.94266C4.88623 7.83183 5.6829 6.92683 6.68373 6.92683C7.69207 6.92683 8.49707 7.84016 8.48123 8.94349C8.48123 10.0543 7.68457 10.9585 6.68373 10.9585ZM13.3296 10.9585C12.3437 10.9585 11.5321 10.0543 11.5321 8.94266C11.5321 7.83183 12.3279 6.92683 13.3296 6.92683C14.3379 6.92683 15.1429 7.84016 15.1271 8.94349C15.1271 10.0543 14.3387 10.9585 13.3296 10.9585Z"
                fill="white"
              ></path>
            </svg>
          </a>
          <a
            className="mr-[10px] p-1 hover:bg-blue-600 transition rounded-lg"
            href="https://twitter.com/RobinosPredict"
            target="_blank"
          >
            <svg
              className="inline"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3887 0H15.9954L10.3004 6.50958L17.0005 15.3659H11.7546L7.64624 9.99387L2.94432 15.3659H0.336238L6.42791 8.40296L0.000488281 0.000708366H5.37957L9.09336 4.91088L13.3887 0ZM12.4742 13.8061H13.9185L4.59474 1.47829H3.0449L12.4742 13.8061Z"
                fill="white"
              ></path>
            </svg>
          </a>
          <a
            className="mr-[10px] p-1 hover:bg-blue-600 transition rounded-lg"
            href="https://t.me/robinoscommunity"
            target="_blank"
          >
            <svg
              className="inline"
              width="18"
              height="15"
              viewBox="0 0 18 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0085 0.229343C16.0085 0.229343 17.6272 -0.401907 17.4918 1.13101C17.4472 1.76226 17.0426 3.97184 16.7276 6.36143L15.6485 13.4406C15.6485 13.4406 15.5585 14.4777 14.7489 14.6581C13.9397 14.8381 12.7255 14.0268 12.5005 13.8464C12.3205 13.711 9.12804 11.6818 8.00387 10.6902C7.68887 10.4193 7.32887 9.87851 8.04887 9.24726L12.7705 4.73809C13.3101 4.19643 13.8497 2.93393 11.6014 4.46726L5.30554 8.75059C5.30554 8.75059 4.58596 9.20184 3.23721 8.79601L0.313873 7.89393C0.313873 7.89393 -0.765294 7.21768 1.07846 6.54143C5.57554 4.42226 11.1068 2.25809 16.008 0.228926"
                fill="white"
              ></path>
            </svg>
          </a>
          <a
            className="mr-[10px] p-1 hover:bg-blue-600 transition rounded-lg"
            href="https://robinos-prediction.medium.com/"
            target="_blank"
          >
            <svg
              className="inline"
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5633 1.94628L18 0.500288V0.183594H13.0242L9.47813 9.47328L5.44453 0.183594H0.227344V0.500288L1.90547 2.62631C2.06953 2.78343 2.15391 3.0142 2.13281 3.24497V11.5993C2.18438 11.9013 2.09297 12.2081 1.89141 12.4266L0 14.8399V15.1517H5.35781V14.835L3.46875 12.4291C3.36754 12.3215 3.2914 12.1908 3.24628 12.0473C3.20116 11.9038 3.18826 11.7513 3.20859 11.6018V4.37427L7.9125 15.1566H8.45859L12.5039 4.37427V12.9643C12.5039 13.1901 12.5039 13.2368 12.3633 13.3865L10.9078 14.8669V15.1836H17.9672V14.8669L16.5633 13.4209C16.4414 13.3227 16.3781 13.1582 16.4039 12.9987V2.36854C16.3918 2.28965 16.4002 2.20879 16.4282 2.13447C16.4563 2.06016 16.5029 1.99515 16.5633 1.94628Z"
                fill="white"
              ></path>
            </svg>
          </a>
        </div>
        <div>© 2024 Robinos </div>
      </div>
    </div>
  );
}

export default sidebar;
