import React from 'react';
import { Spacer, Button, Skeleton } from "@nextui-org/react";
import { SyncIcon } from "@primer/octicons-react";
import PortfolioCard from './PortfolioCard/PortfolioCard.jsx';
import usePortfolio from './usePortfolio';
import usePortfolioStore from './usePortfolioStore';
import useUserStore from "../../App/useUserStore";
// import { Toaster } from 'sonner';
// import { motion } from 'framer-motion';
import Footer from "../../shared/components/Footer.jsx";


const Portfolio = () => {
    const { user } = useUserStore();
    const { portfolio, isLoaded, fetchPortfolio } = usePortfolio(user.address);
    const { isIconRoating, setIsIconRoating } = usePortfolioStore();

    const handleUpdatePortfolio = () => {
        setIsIconRoating();
        fetchPortfolio();
    };

    return (
        <>
            <div className='min-h-screen max-w-md mx-auto w-full p-4'>
                <Spacer y={4} />
                {/* <Toaster 
                    richColors 
                    position="bottom-center" 
                    theme="dark"
                    toastOptions={{ className: 'border-2 rounded-2xl' }} 
                /> */}
                <div className="ml-3 mr-3 flex justify-between items-end">
                    <div className="flex items-end text-xl">
                        <span className="font-semibold">Wallet</span>
                    </div> 
                    <Button
                        isIconOnly
                        className="bg-card border-1 border-cardBorder"
                        variant="light"
                        onClick={handleUpdatePortfolio}
                        aria-label="Refresh portfolio"
                    >
                        {/* <motion.div
                            animate={{ rotate: isIconRoating ? 360 : 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >*/}
                            <div style={{ transform: `rotate(${isIconRoating ? 360 : 0}deg)`, transition: '0.5s' }}>
                                <SyncIcon size={16} className='mb-[1px]' />
                            </div>
                        {/*</motion.div> */}
                    </Button>
                </div>
                <Spacer y={2} />
                <Skeleton isLoaded={isLoaded} className='rounded-2xl h-40'>
                    {isLoaded && <PortfolioCard portfolio={portfolio} />}
                </Skeleton>
            </div>

            < Footer />
        </>
    );
};

export default Portfolio;
