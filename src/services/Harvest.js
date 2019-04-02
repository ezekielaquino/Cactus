import * as Http from 'providers/Http';


export const getHarvestAccount = () => {
 return Http.get(`https://id.getharvest.com/api/v2/accounts`)
  .then(response => response.json())
  .then(data => data);
};

export const getHarvestProjects = ({ accountId, userId }) => {
  return Http.get(`https://api.harvestapp.com/v2/users/me/project_assignments`, {
    appendHeaders: {
      "Harvest-Account-Id": accountId,
      "User-Agent": "Cactus (ezekiel@bakkenbaeck.no)",
    }
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(e => console.log(e));
};