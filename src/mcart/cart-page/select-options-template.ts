export const selectOptionTemplate = `<option value="">Choose...</option>
<% options.forEach( option => { %>
    <option value="<%= option.name %>" <%= (selectedOption && option.name === selectedOption) ? 'selected': '' %> data-selectedoption="<%= JSON.stringify(option) %>"><%= option.name %></option>
<% }) %>`;
