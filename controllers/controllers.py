# -*- coding: utf-8 -*-
from openerp import http
import json
import logging

_logger = logging.getLogger(__name__)

class RequestSnippet(http.Controller):
    @http.route('/request/snippet', auth='public', website=True)
    def index(self, **kw):
        Partners = http.request.env['res.partner']
        return http.request.render("request_snippet.index", {
            'partners': Partners.search([])
        })

    @http.route('/request/test', auth='public', website=True)
    def r_test(self, **kw):
        Partners = http.request.env['res.partner']
        return http.request.render("request_snippet.r_test", {
            'partners': Partners.search([])
        })

    @http.route('/request/test/test_request', type='json', auth="none")
    def test_request(self, **kw):
        Partners = http.request.env['res.partner'].sudo().search([])
        respons = []
        for rec in Partners:
            respons.append( {'id': rec.id, 'name': rec.name} )

        # _logger.info("___________RESPONS___________ %s", respons)
        return {
            'partners': respons
        }
    