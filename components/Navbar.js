import React from 'react';
import Image from 'next/image';
import logo from '../assets/pika.png'

const style = {
  wrapper:
    "flex justify-between items-center px-20 h-20 w-screen absolute top-0 z-30 bg-gradient-to-r from-slate-700 via-gray-700 to-slate-900 ",
  logo: "font-semibold text-2xl",
  accountLabel: "text-white bg-pink-600 px-3 py-2 rounded-md",
  button:
    "bg-zinc-300 px-6 py-2 rounded-xl text-xl hover:bg-zinc-400 transition-colors active:bg-zinc-200	",
};

const Navbar = ({isConnected, connectWallet, currentAccount}) => {
    return (
      <nav className={style.wrapper}>
        {/* <h1 className={style.logo}>PokeMint</h1> */}
        <Image src={logo} height='50px' width='70px' alt='logo'/>
        {isConnected ? (
          <p className={style.accountLabel}>{`${currentAccount.substr(
            0,
            5
          )}...${currentAccount.substr(-5)}`}</p>
        ) : (
          <button className={style.button} onClick={() => connectWallet()}>
            {" "}
            Connect{" "}
          </button>
        )}
      </nav>
    );
};

export default Navbar;
