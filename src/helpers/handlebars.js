const { request } = require('express');
const Handlebars = require('handlebars');
const hbs_sections = require('express-handlebars-sections');

module.exports = {
    section: hbs_sections(),

        sum:(a,b) => a+b, //sổ ra stt
        sortable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : 'default';
            const icons = {
                default: 'bi bi-chevron-expand',
                asc:'bi bi-sort-down-alt',
                desc:'bi bi-sort-up',
            };
            const types = {
                default:'desc',
                asc:'desc',
                desc:'asc',
            };

            const icon = icons[sortType];
            const type = types[sortType];
            const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`)

            const output = `<a href="${href}">
                                <i class="${icon}"></i>
                            </a>`;
                   return new Handlebars.SafeString(output);         
        }
};