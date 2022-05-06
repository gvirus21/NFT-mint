import React from 'react';
import Image from 'next/image';
import logo from '../assets/pika.png'

const style = {
  wrapper:
    "flex justify-between items-center px-20 h-20 w-screen absolute top-0 z-30 bg-gradient-to-1 from-purple-900 via-violet-900 to-purple-900 ",
  logo: "font-semibold text-2xl",
  accountLabel: "text-white bg-pink-800 border-4 border-pink-900 px-3 py-2 rounded-xl",
  button:
    "bg-zinc-300 px-6 py-2 rounded-xl text-xl hover:bg-zinc-400 transition-colors active:bg-zinc-200	",
};

const Navbar = ({isConnected, connectWallet, currentAccount}) => {
    return (
      <nav className={style.wrapper}>
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
