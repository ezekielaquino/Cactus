import { useEffect, useContext } from 'react';
import { navigate } from 'gatsby';
import { Context } from 'providers/Context';
import { getHarvestAccount, getHarvestProjects } from 'services/Harvest';


function initAccounts(props = {}) {
  const { redirect } = props;
  const context = useContext(Context);

  const getProjects = (account, user) => {
    getHarvestProjects({
      accountId: account.id,
      userId: user.id,
    })
      .then(data => {
        context.setActiveProjects(data);
        context.setInitialized(true);

        setTimeout(() => {
          context.setInitState({ accounts: 'success', projects: 'success' });
          console.log(`Hi there ${user.first_name}!`);

          if (redirect) setTimeout(() => { navigate('/') }, 1000);
        }, redirect ? 1000 : 0);
        
      });
  };

  useEffect(() => {
    if (localStorage.getItem('harvestToken') && !context.accounts) {
      context.setInitState({
        ...context.initState,
        accounts: 'loading',
      });

      getHarvestAccount()
        .then(data => {
          const { user, accounts } = data;
          const account = accounts.find(account => account.product === 'harvest');

          localStorage.setItem('harvestUserId', user.id);
          localStorage.setItem('harvestAccountId', account.id);
          
          context.setUser(user);
          context.setHarvestAccounts(accounts);

          setTimeout(() => {
            context.setInitState({ accounts: 'success', projects: 'loading' });
            getProjects(user, accounts);
          }, redirect ? 500 : 0);
        })
        .catch(() => {
          window.location = 'https://id.getharvest.com/oauth2/authorize?client_id=Z8pIKUO8l441-GYAsK-DzqRq&response_type=token';
        });
    }
  }, []);
}


export default initAccounts;