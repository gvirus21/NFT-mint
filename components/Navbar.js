import React from 'react';

const style = {
  wrapper:
    "flex justify-between items-center px-20 h-24 sticky top-0 z-30 bg-white ",
  logo: "font-semibold text-2xl",
  accountLabel: "text-white bg-violet-300 px-6 py-2 rounded-full",
  button:
    "bg-zinc-300 px-6 py-2 rounded-xl text-xl hover:bg-zinc-400 transition-colors active:bg-zinc-200	",
};

const Navbar = ({isConnected, connectWallet, currentAccount}) => {
    return (
      <nav className={style.wrapper}>
        <h1 className={style.logo}>PokeMint</h1>

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
