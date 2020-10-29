import React from 'react'
import { fbt } from 'fbt-runtime'
import classnames from 'classnames'
import Link from 'next/link'

import EtherscanLink from 'components/earn/EtherscanLink'

export default function LiquidityWizzard({ pool, onHideWizzard }) {
  const activeStep = 3
  const getStepClass = (stepNumber) => {
    if (activeStep === stepNumber) {
      return 'active'
    } else if (activeStep < stepNumber) {
      return 'grey'
    }
    return 'done'
  }

  return (
    <>
      <div className="d-flex body">
        <div className="steps-holder">
          <div className="title">{fbt('How to Earn OGN by Providing Liquidity to OUSD', 'wizzard helper title')}</div>
          <div className="steps">
            <div className={`step ${getStepClass(1)}`}>
              <div className="step-number">
                <img className="checkmark" src="/images/checkmark.svg"/>
                1
              </div>
              <div>{fbt('Purchase OUSD', 'Purchase OUSD')}</div>
            </div>
            <div className={`step ${getStepClass(2)}`}>
              <div className="step-number">
                <img className="checkmark" src="/images/checkmark.svg"/>
                2
              </div>
              <div>{fbt('Provide liquidity', 'Provide liquidity')}</div>
            </div>
            <div className={`step ${getStepClass(3)}`}>
              <div className="step-number">
                <img className="checkmark" src="/images/checkmark.svg"/>
                3
              </div>
              <div>{fbt('Stake to earn OGN', 'Stake to earn OGN')}</div>
            </div>
          </div>
        </div>
        <div className={`graphic-holder d-flex flex-column align-items-center justify-content-start flex-grow-1 step-${activeStep}`}>
          {activeStep === 1 && <>
              <img className="ousd-icon"  src="/images/ousd-coin.svg"/>
              <div className="big-title">{fbt('Purchase OUSD by going to the “Mint” section of our DApp', 'Wizard purchase OUSD text')}</div>
              <Link href="/dapp">
                <a className="btn-blue h-40">
                  {fbt('Mint OUSD', 'Mint OUSD')}
                </a>
              </Link>
            </>
          }
          {activeStep === 2 && <>
              <img className="uniswap-icon"  src="/images/uniswap-icon-white.svg"/>
              <div className="big-title">{fbt('Provide ' + fbt.param('pool name', pool.name) + ' liquidity on Uniswap', 'Provide liquidity header')}</div>
              <div className="subtitle">{fbt("Remember, your OUSD will not grow while it's in Uniswap, but you will earn fees for providing liquidity.", 'Uniswap step subtitle')}</div>
              <a
                className="btn-blue dark h-40"
                href={`https://uniswap.exchange/add/${pool.coin_one.contract_address}/${pool.coin_two.contract_address}`}
              >
                {fbt('Visit Uniswap', 'Visit Uniswap')}
              </a>
            </>
          }
          {activeStep === 3 && <>
              <img className="ogn-icon"  src="/images/ogn-icon-blue.svg"/>
              <div className="big-title">{fbt('Stake your LP tokens on our DApp and start earning OGN', 'Wizard stake LP tokens text')}</div>
              <Link href="/dapp">
                <a
                  className="btn-blue dark h-40"
                  onClick={e => {
                    e.preventDefault()
                    onHideWizzard()
                  }}
                >
                  {fbt('Take me there', 'Take me there')}
                </a>
              </Link>
            </>
          }
        </div>
      </div>
      <div className="footer-links d-flex justify-content-center">
        <EtherscanLink
          text={fbt('Pool Contract', 'Pool Contract')}
          href={pool.pool_contract_address}
          className="mr-29"
        />
        {/* TODO Update Rewards contract address */}
        <EtherscanLink
          text={fbt('Rewards Contract', 'Rewards Contract')}
          href={pool.pool_contract_address}
        />
      </div>
      <style jsx>{`
        .body {
          min-height: 438px;
        }

        .steps-holder {
          width: 320px;
          min-height: 100%;
          background-color: white;
          border-radius: 10px 0px 0px 10px;
          border: solid 1px #cdd7e0;
          padding: 30px;
        }

        .graphic-holder {
          min-height: 100%;
          border-radius: 0px 10px 10px 0px;
          border: solid 1px #cdd7e0;
          border-left: 0px;
          padding: 0xp 49px 30px 49px;
        }

        .steps {
          font-size: 18px;
          font-weight: bold;
          color: black;
        }

        .step {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .steps .step-number {
          color: white;
          margin-right: 11px;
          font-weight: normal;
          border-radius: 15px;
          position: relative;
        }

        .step.active {
          color: black;
        }

        .step.active .step-number {
          background-color: #183140;
        }

        .step .checkmark {
          visibility: hidden;
          position: absolute;
          right: -5px;
          bottom: -4px;
        }

        .step.done .checkmark {
          visibility: inherit;
        }

        .step.done,
        .step.grey {
          color: #bbc9da;
        }

        .step.done .step-number,
        .step.grey .step-number {
          background-color: #bbc9da;
        }

        .step-number {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .title {
          font-size: 24px;
          line-height: 1.29;
          color: #1e313f;
          margin-top: 50px;
          margin-bottom: 25px;
        }

        .graphic-holder .ousd-icon {
          width: 121px;
          height: 121px;
          margin-top: 77px;
          margin-bottom: 34px;
        }

        .graphic-holder .ogn-icon {
          width: 120px;
          height: 120px;
          margin-top: 79px;
          margin-bottom: 33px;
        }

        .graphic-holder .uniswap-icon {
          width: 92px;
          height: 108px;
          margin-top: 48px;
          margin-bottom: 28px;
        }

        .graphic-holder.step-1 {
          background-color: #183140;
          background-image: url('/images/earn-coin-waves-grey.svg');
          background-repeat: no-repeat;
          background-position: center top;
        }

        .graphic-holder.step-2 {
          background-image: radial-gradient(circle at 50% 30%, #ab71ff, #7a26f3 60%);
        }

        .graphic-holder.step-3 {
          background-color: #1a82ff;
          background-image: url('/images/earn-coin-waves-blue.svg');
          background-repeat: no-repeat;
          background-position: center top;
        }

        .big-title {
          font-size: 28px;
          text-align: center;
          color: white;
          max-width: 390px;
          line-height: 1.2;
          margin-bottom: 40px;
        }

        .graphic-holder.step-2 .big-title {
          max-width: 540px;
          margin-bottom: 10px;
        }

        .subtitle {
          opacity: 0.8;
          font-size: 18px;
          text-align: center;
          color: white;
          margin-bottom: 64px;
          max-width: 490px;
          line-height: 1.2;
        }

        .footer-links {
          margin-top: 52px;
        }

        .h-40 {
          max-height: 40px;
        }

        .btn-blue.dark {
          background-color: #183140;
        }

        .btn-blue.dark:hover {
          background-color: #001120;
          color: #8293a4;
        }

        @media (max-width: 992px) {
        }
      `}</style>
    </>
  )
}