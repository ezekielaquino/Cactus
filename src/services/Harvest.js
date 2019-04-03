import * as Http from 'providers/Http';


export const getHarvestAccount = () => {
 return Http.get(`https://id.getharvest.com/api/v2/accounts`)
  .then(response => response.json())
  .then(data => data);
};

export const getHarvestProjects = ({ accountId, userId }) => {
  return Http.get(`https://api.harvestapp.com/v2/users/me/project_assignments`, {
    appendHeaders: {
      "Harvest-Account-Id": localStorage.getItem('harvestAccountId'),
      "User-Agent": "Cactus (ezekiel@bakkenbaeck.no)",
    }
  })
  .then(response => response.json())
  .then(data => {
    return data.project_assignments.filter(project => project.is_active);
  })
  .catch(e => console.log(e));
};

export const createHarvestTimesheet = statusItems => {
  const now = new Date();
  const spend_date = now.toISOString().substr(0, 10);
  const user_id =  localStorage.getItem('harvestUserId');

  const requests = statusItems.map(({
    projectId: project_id,
    projectTask = {},
    time,
  }) => {
    const payload = {
      user_id,
      project_id,
      task_id: projectTask.value,
      hours: time.toFixed(1),
      spend_date,
    };
    // return console.log(payload)
    return Http.post(`https://api.harvestapp.com/v2/time_entries`, JSON.stringify(payload), {
      appendHeaders: {
        "Harvest-Account-Id": localStorage.getItem('harvestAccountId'),
        "User-Agent": "Cactus (ezekiel@bakkenbaeck.no)",
      }
    });
  })

  return Promise.all(requests)
    .then(response => {
      console.log(response);
    });
};