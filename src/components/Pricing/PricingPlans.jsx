import React, { useState } from 'react';
import './Pricing.css';

const PricingPlans = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      title: 'STUDENT',
      price: { daily: '₹199/-', monthly: '₹1499/-' },
      features: [
        'AI Judge',
        'AI Lawyer',
        'Relevant Case Laws',
        'Verdict'
      ]
    },
    {
      title: 'INTERN',
      price: { daily: '₹299/-', monthly: '₹1999/-' },
      features: [
        'All features of STUDENT',
        'AI Assistant',
        'Case Search',
        'AI Drafter (Beta)'
      ]
    },
    {
      title: 'JUNIOR ADVOCATE',
      price: { daily: '₹499/-', monthly: '₹4,499/-' },
      features: [
        'All Features of INTERN',
        'Testimony + Evidence',
        'LegalGPT',
        'First Draft of Arguments'
      ],
      popular: true
    },
    {
      title: 'LAW FIRM',
      features: [
        'Custom Case Law Jurisdiction Model',
        'Custom Drafting',
        'Document Management System'
      ],
      custom: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-[32px] font-medium leading-[40.32px] tracking-[-0.01em] text-center text-white mb-2">
          Get Started With
        </h3>

        <div
          className="text-center mb-6 font-extrabold text-transparent bg-clip-text"
          style={{
            background: 'linear-gradient(179.42deg, #018585 30.96%, #00FFA3 99.5%)',
            backgroundClip: 'text',
            color: 'transparent',
            fontFamily: 'Plus Jakarta Sans',
            fontWeight: 800,
            letterSpacing: '-0.01em',
            fontSize: '48px',
            lineHeight: '60px',
          }}
        >
          AI COURTROOM
        </div>

        <div className="flex justify-center gap-6 mb-10">
          <button
            className={`h-[30px] w-[120px] gap-0 border-2 border-white ${
              billingCycle === 'daily' ? 'bg-[#9AFFDB]' : 'bg-white'
            } text-[#018585] font-extrabold text-[15px] leading-[18.9px] text-center rounded-xl`}
            onClick={() => setBillingCycle('daily')}
          >
            Daily
          </button>
          <button
            className={`h-[30px] w-[120px] gap-0 border-2 border-white ${
              billingCycle === 'monthly' ? 'bg-[#9AFFDB]' : 'bg-white'
            } text-[#018585] font-extrabold text-[15px] leading-[18.9px] text-center rounded-xl`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-400 mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`relative rounded-lg shadow-lg overflow-hidden flex flex-col bg-[rgba(217,217,217,0.37)] border-4 border-white w-[470] h-[285px] ${
                plan.popular ? 'popular-plan' : ''
              }`}
            >
              <div className="p-6 flex flex-col h-full">
                <h2 className="text-xl font-bold text-white mb-4">{plan.title}</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-white">
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.custom ? (
                  <>
                    <hr className="border-t border-white my-4" />
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-white font-bold">CONNECT TO ADMINISTRATOR</div>
                      <button
                        className="text-white py-2 px-8 rounded transition-colors border border-white font-bold"
                        style={{
                          background: 'linear-gradient(180deg, #006E6E 0%, #003131 100%)',
                        }}
                      >
                        CONTACT US
                      </button>
                    </div>
                  </>
                ) : (
                  <div className=

                  "mt-2 flex justify-between items-center mb-4"
                  >
                    <div className="text-3xl font-bold text-white w-[170px] h-[50px] ">
                      {billingCycle === 'daily' ? plan.price?.daily : plan.price?.monthly}
                    </div>
                    <button
                      className="text-white py-2 px-8 rounded transition-colors border-2 border-white"
                      style={{
                        background: 'linear-gradient(180deg, #006E6E 0%, #003131 100%)',
                      }}
                    >
                      Get It Now
                    </button>
                  </div>
                )}

                {plan.popular && (
                  <div
                    className="absolute bottom-0 left-0 w-full text-center text-sm text-gray-900 font-medium mt-2"
                    style={{
                      backgroundColor: 'rgba(141, 255, 190, 1)'
                      
                    }}
                  >
                    MOST OPTED SUBSCRIPTION
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
