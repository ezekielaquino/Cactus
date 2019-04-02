import { useEffect, useContext } from 'react';
import { navigate } from 'gatsby';
import { Context } from 'providers/Context';
import { getHarvestAccount, getHarvestProjects } from 'services/Harvest';


function initAccounts() {
  const context = useContext(Context);

  useEffect(() => {
    if (!context.isInitialized && context.harvestToken) {
      getHarvestAccount()
        .then(data => {
          const { user, accounts } = data;
          const forecastAccount = accounts.find(account => account.product === 'forecast');

          context.setUser(user);
          context.setHarvestAccounts(accounts);
          context.setInitialized(true);
          
          getHarvestProjects({
            accountId: forecastAccount.id,
            userId: user.id,
          });

          console.log(`Hi there ${user.first_name}!`);
          navigate('/');
        });
    }

    context.setInitialized('initializing');
  }, []);
}


export default initAccounts;