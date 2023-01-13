import axios from 'axios'

export const getEventsBlob = async (
    container: string,
    blob: string,
    path: string = '',
    audit: boolean = false
  ): Promise<any> => {
    return axios.get(`/api/getBlob`, {
        params: {
            id: blob,
            container,
            path,
            audit
        }
    });
};

export const sendEvent = (event: any, eventContainer: string): Promise<any> => {
    return axios.post('/api/sendEvent', {
        params: {
            eventContainer: eventContainer,
            id: event.data.id
          },
      body: event,
    });
  };
  
