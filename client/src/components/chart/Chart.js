import React from 'react';
const Chart = ()=> {
    return (
      <div className="Chart">
      </div>
    );
  }
  
  export default Chart;

  <Card sx={{ width: '100%', m: 'auto', p: 1 }}>
  <form onSubmit={handleSubmit} noValidate>
      <div>

          <TextField
              required
              id='outlined-required'
              label='Starting Point'
              name='starting_point'
              type='text'
              value={inputField.starting_point}
              sx={{ p: 1 }}
              onChange={e => setInputField({ ...inputField, starting_point: e.target.value })}
          />
          <TextField
              required
              id='outlined-required'
              label='Destination Point'
              name='destination_point'
              type='text'
              value={inputField.destination_point}
              onChange={e => setInputField({ ...inputField, destination_point: e.target.value })}
              sx={{ p: 1 }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                  
                  renderInput={(props) => <TextField sx={{ p: 1 }} {...props} />}
                  label="Depature Date"
                  value={inputField.departure_date}
                  onChange={(newValue) => {
                      setInputField({ ...inputField, departure_date: newValue });
                  }}
              />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker


                  renderInput={(props) => <TextField sx={{ p: 1 }} {...props} />}
                  label="Arrival Date"
                  value={inputField.arrival_date}
                  onChange={(newValue) => {
                      setInputField({ ...inputField, arrival_date: newValue });
                  }}
              />
          </LocalizationProvider>

      </div>

      <div>
          <Chip sx={{ m: 2 }} label="Add Stoppings" color="primary" onClick={addStopping} />
      </div>
      {
          inputField.stoppings.map((item, i) => {
              return (
                  <ItemHeader key={i}>
                      <div>
                          <TextField
                              required
                              id='outlined-required'
                              label='Stopping Name'
                              name='stopping_name'
                              type='text'
                              sx={{ p: 1 }}
                              value={item.stopping_name}
                              onChange={(e) => handleInputChange(e, i)}
                          />
                          
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DateTimePicker
                                  renderInput={(props) => <TextField sx={{ p: 1 }} {...props} />}
                                  label="Arrival Date"
                                  name = 'stopping_arrival_date'
                                  value={item.stopping_arrival_date}
                                  onChange={(newValue) => {
                                      handleDateChange(newValue, i, 'stopping_arrival_date');
                                  }}
                              />
                          </LocalizationProvider>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DateTimePicker
                                 
                                  renderInput={(props) => <TextField sx={{ p: 1 }} {...props} />}
                                  label="Departure Date"
                                  name= "stopping_departure_date"
                                  value={item.stopping_departure_date}
                                  onChange={(newValue) => {
                                      handleDateChange(newValue, i, 'stopping_departure_date');
                                  }}
                              />
                          </LocalizationProvider>
                      </div>
                      <div>
                          <TextField
                              required
                              id='outlined-required'
                              label='Outlet Name'
                              name='outlet_name'
                              type='text'

                              sx={{ p: 1 }}
                              value={item.outlet_name}
                              onChange={(e) => handleInputChange(e, i)}
                          />
                          <TextField
                              required
                              id='outlined-required'
                              label='Address'
                              name='address'

                              type='text'
                              sx={{ p: 1 }}
                              value={item.address}
                              onChange={(e) => handleInputChange(e, i)}
                          />
                          <TextField
                              required
                              id='outlined-required'
                              label='District'
                              name='district'
                              type='text'
                              sx={{ p: 1 }}
                              value={item.district}
                              onChange={(e) => handleInputChange(e, i)}
                          />
                          <TextField
                              required
                              id='outlined-required'
                              label='Postal Code'
                              name='postal'
                              type='text'
                              sx={{ p: 1 }}
                              value={item.postal}
                              onChange={(e) => handleInputChange(e, i)}
                          />
                      </div>
                      <Chip sx={{ p: 1, mt: 1 }} label="Remove" color='error' />
                      <Divider sx={{ p: 1 }} variant="middle" />
                  </ItemHeader>
                  
                  
              )
          })
      }
      <Button type="submit" variant="contained">Submit</Button>
  </form>

</Card>