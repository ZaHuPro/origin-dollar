import React, { useState, useEffect } from 'react'
import { fbt } from 'fbt-runtime'

import EarnModal from 'components/earn/modal/EarnModal'
import { formatCurrency } from 'utils/math'
import AccountStore from 'stores/AccountStore'
import { useStoreState } from 'pullstate'

const UnstakeModal = ({ pool, onClose, onUserConfirmedStakeTx, onError }) => {
  // show-ogn-to-unstake, unstake-user-wait
  const [modalState, setModalState] = useState('show-ogn-to-unstake')
  const connectorIcon = useStoreState(AccountStore, (s) => s.connectorIcon)

  const getActions = () => {
    if (modalState === 'show-ogn-to-unstake') {
      return [
        {
          text: fbt('Unstake', 'Unstake'),
          isDisabled: false,
          onClick: async () => {
            setModalState('unstake-user-wait')
            const result = await pool.contract.exit()
            onUserConfirmedStakeTx(result)
            onClose()
          },
        },
      ]
    }
  }

  return (
    <>
      <EarnModal
        closeable={(e) => {
          if (modalState === 'show-ogn-to-unstake') {
            return true
          }
          return false
        }}
        onClose={onClose}
        bodyContents={
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="emphasised-balance-number">
              {formatCurrency(pool.staked_lp_tokens, 2)}
            </div>
            <div className="d-flex mb-33 align-items-center">
              <img
                className="coin-icon first"
                src={`/images/${pool.coin_one.icon}`}
              />
              <img
                className="coin-icon"
                src={`/images/${pool.coin_two.icon}`}
              />
              <div className="grey-text">
                {fbt('Staked LP tokens', 'Staked LP tokens')}
              </div>
            </div>
            <div className="emphasised-balance-number">
              {formatCurrency(pool.claimable_ogn, 2)}
            </div>
            <div className="d-flex mb-33 align-items-center">
              <img className="coin-icon" src="/images/ogn-icon-blue.svg" />
              <div className="grey-text">
                {fbt('Unclaimed OGN', 'Unclaimed OGN')}
              </div>
            </div>
            <div className="grey-text mb-30">
              {fbt(
                'When you unstake, your OGN is claimed automatically',
                'Unstake modal message'
              )}
            </div>
          </div>
        }
        title={fbt('Claim OGN', 'Claim OGN')}
        actions={getActions()}
        actionsBody={
          <>
            {['unstake-user-wait'].includes(modalState) && (
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="big-connector-icon"
                  src={`/images/${connectorIcon}`}
                />
                <div className="action-text">
                  {fbt(
                    'Please finalize your transaction…',
                    'Finalize your transaction'
                  )}
                </div>
              </div>
            )}
          </>
        }
      />
      <style jsx>{`
        .emphasised-balance-number {
          font-size: 36px;
          color: black;
          margin-bottom: 2px;
        }

        .coin-icon {
          width: 20px;
          height: 20px;
          margin-right: 7px;
        }

        .coin-icon.first {
          margin-right: -2px;
        }

        .mb-33 {
          margin-bottom: 33px;
        }

        .mb-30 {
          margin-bottom: 30px;
        }

        .big-connector-icon {
          width: 42px;
          height: 42px;
          margin-right: 20px;
        }

        .action-text {
          font-size: 18px;
          color: #1e313f;
        }

        .grey-text {
          font-size: 14px;
          color: #8293a4;
        }

        @media (max-width: 799px) {
        }
      `}</style>
    </>
  )
}

export default UnstakeModal
