import { useEffect, useContext } from 'react';
import { navigate } from 'gatsby';
import { Context } from 'providers/Context';
import { getHarvestAccount, getHarvestProjects } from 'services/Harvest';


function initAccounts(props = {}) {
  const { redirect } = props;
  const context = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('harvestToken') && !context.accounts) {
      getHarvestAccount()
        .then(data => {
          const { user, accounts } = data;
          const account = accounts.find(account => account.product === 'harvest');

          context.setUser(user);
          context.setHarvestAccounts(accounts);
          context.setInitialized(true);
          
          getHarvestProjects({
            accountId: account.id,
            userId: user.id,
          })
            .then(data => context.setActiveProjects(data));

          console.log(`Hi there ${user.first_name}!`);

          if (redirect) setTimeout(() => { navigate('/') }, 1000);
        });
    }
  }, []);
}


export default initAccounts;