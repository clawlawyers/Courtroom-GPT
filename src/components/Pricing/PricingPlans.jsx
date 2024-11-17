import React, { useState } from 'react';
import './Pricing.css';

const PricingPlans = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      title: 'STUDENT',
      price: { daily: '₹199/-', monthly: '₹1499/-' },
      features: ['AI Judge', 'AI Lawyer', 'Relevant Case Laws', 'Verdict']
    },
    {
      title: 'INTERN',
      price: { daily: '₹299/-', monthly: '₹1999/-' },
      features: ['All features of STUDENT', 'AI Assistant', 'Case Search', 'AI Drafter (Beta)']
    },
    {
      title: 'JUNIOR ADVOCATE',
      price: { daily: '₹499/-', monthly: '₹4,499/-' },
      features: ['All Features of INTERN', 'Testimony + Evidence', 'LegalGPT', 'First Draft of Arguments'],
      popular: true
    },
    {
      title: 'LAW FIRM',
      features: ['Custom Case Law Jurisdiction Model', 'Custom Drafting', 'Document Management System'],
      custom: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-medium leading-snug text-center text-white mb-2">
          Get Started With
        </h3>

        <div
          className="title text-center mb-6 font-extrabold text-transparent bg-clip-text text-4xl sm:text-5xl md:text-6xl"
          style={{
            background: 'linear-gradient(179.42deg, #018585 30.96%, #00FFA3 99.5%)',
            backgroundClip: 'text',
            color: 'transparent',
            fontFamily: 'Plus Jakarta Sans',
            fontWeight: 800,
            letterSpacing: '-0.01em',
            lineHeight: '1.2'
          }}
        >
          AI COURTROOM
        </div>

        <div className="flex justify-center gap-4 sm:gap-6 mb-8">
          <button
            className={`h-[30px] w-[130px] border-2 border-white rounded-lg font-bold text-sm sm:text-base ${
              billingCycle === 'daily' ? 'bg-[#9AFFDB] text-[#018585]' : 'bg-white text-[#018585]'
            }`}
            onClick={() => setBillingCycle('daily')}
          >
            Daily
          </button>
          <button
            className={`h-[30px] w-[130px] border-2 border-white rounded-lg font-bold text-sm sm:text-base ${
              billingCycle === 'monthly' ? 'bg-[#9AFFDB] text-[#018585]' : 'bg-white text-[#018585]'
            }`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`relative rounded-lg shadow-lg overflow-hidden flex flex-col bg-[rgba(217,217,217,0.37)] border-4 border-white p-6 ${
                plan.popular ? 'popular-plan' : ''
              }`}
              style={{ height: '100%' }}
            >
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4">{plan.title}</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-white">
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.custom ? (
                <>
                  <hr className="border-t border-white my-4" />
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                    <div className="text-white font-bold mb-2 sm:mb-0">CONNECT TO ADMINISTRATOR</div>
                    <button
                      className="text-white py-2 px-6 sm:px-8 rounded transition-colors border border-white font-bold"
                      style={{
                        background: 'linear-gradient(180deg, #006E6E 0%, #003131 100%)',
                      }}
                    >
                      CONTACT US
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    {billingCycle === 'daily' ? plan.price?.daily : plan.price?.monthly}
                  </div>
                  {/* Consistent Get It Now button styling */}
                  <button
                    className="text-white py-2 px-6 rounded transition-colors border border-white font-bold"
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
                  className="absolute bottom-0 left-0 w-full text-center text-sm font-medium mt-2 text-gray-900 bg-green-200 py-1"
                >
                  MOST OPTED SUBSCRIPTION
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;