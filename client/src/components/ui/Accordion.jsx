import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const WhatWeDoAccordion = () => {
  const accordionData = [
    {
      title: "Easy Pickup",
      icon: (
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      description: "Schedule doorstep collection of any fabric type with just a few clicks. Our user-friendly platform makes it simple to book a pickup at your convenience. No need to leave your home - we come to you!"
    },
    {
      title: "Instant Rewards",
      icon: (
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      description: "Get paid instantly via UPI or cash, based on the weight of your clothes. Our transparent pricing system ensures you get fair value for your items. Payment is processed immediately after collection and verification."
    },
    {
      title: "Responsible Recycling",
      icon: (
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      description: "All collected garments are processed at verified recycling centers, ensuring eco-conscious disposal. We partner with certified facilities that follow environmental guidelines and contribute to sustainable textile processing."
    },
    {
      title: "Efficient Operations",
      icon: (
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      description: "Local collection hubs and smart logistics reduce costs and maximize reach. Our optimized route planning and strategic location of collection centers ensure efficient service delivery across all areas."
    }
  ]

  const accordionStyle = {
    mb: 3,
    border: '1px solid #e5e7eb',
    '&:before': { display: 'none' },
    borderRadius: '8px !important',
    overflow: 'hidden',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    '&.Mui-expanded': {
      margin: '0 0 24px 0'
    }
  }

  const summaryStyle = {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #f3f4f6',
    padding: '16px 20px',
    '& .MuiAccordionSummary-content': {
      alignItems: 'center',
      margin: '0'
    },
    '&:hover': {
      backgroundColor: '#f9fafb'
    },
    '&.Mui-expanded': {
      minHeight: '64px',
      borderBottom: '1px solid #e5e7eb'
    }
  }

  const detailsStyle = {
    backgroundColor: '#fafafa',
    padding: '20px',
    borderTop: 'none'
  }

  return (
    <div className="max-w-4xl mx-auto">
      {accordionData.map((item, index) => (
        <Accordion key={index} sx={accordionStyle}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: '#6b7280' }} />}
            sx={summaryStyle}
          >
            <div className="flex items-center w-full">
              <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                {item.icon}
              </div>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: '600', 
                  color: '#1f2937',
                  fontSize: '1.125rem'
                }}
              >
                {item.title}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails sx={detailsStyle}>
            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: '16px', 
                color: '#4b5563', 
                lineHeight: 1.7,
                marginLeft: '64px'
              }}
            >
              {item.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}

export default WhatWeDoAccordion
