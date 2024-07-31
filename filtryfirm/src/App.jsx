import React from 'react';
import './index.css';
import bgHeaderDesktop from './assets/bg-header-desktop.svg';

import photosnapLogo from './assets/photosnap.svg';
import manageLogo from './assets/manage.svg';
import accountLogo from './assets/account.svg';
import myhomeLogo from './assets/myhome.svg';
import loopStudiosLogo from './assets/loop-studios.svg';
import faceitLogo from './assets/faceit.svg';
import shortlyLogo from './assets/shortly.svg';
import insureLogo from './assets/insure.svg';
import eyecamCoLogo from './assets/eyecam-co.svg';
import theAirFilterCompanyLogo from './assets/the-air-filter-company.svg';

import data from './assets/data.json';

const logoMap = {
  photosnap: photosnapLogo,
  manage: manageLogo,
  account: accountLogo,
  myhome: myhomeLogo,
  'loop studios': loopStudiosLogo,
  faceit: faceitLogo,
  shortly: shortlyLogo,
  insure: insureLogo,
  'eyecam co.': eyecamCoLogo,
  'the air filter company': theAirFilterCompanyLogo,
};

function App() {
  const [selectedFilters, setSelectedFilters] = React.useState([]);

  const toggleFilter = (filter) => {
    setSelectedFilters((prevFilters) => 
      prevFilters.includes(filter) 
        ? prevFilters.filter(item => item !== filter) 
        : [...prevFilters, filter]
    );
  };

  const removeFilter = (filter) => {
    setSelectedFilters((prevFilters) => 
      prevFilters.filter(item => item !== filter)
    );
  };

  const filterJobs = (jobs) => {
    if (selectedFilters.length === 0) return jobs;
    return jobs.filter(job =>
      selectedFilters.every(filter =>
        job.languages.includes(filter) || job.tools.includes(filter)
      )
    );
  };

  const filteredJobs = filterJobs(data);

  return (
    <div>
      <header
        className="bg-cover bg-center h-40 mb-6 relative"
        style={{ backgroundImage: `url(${bgHeaderDesktop})` }}
      >
      </header>
      {selectedFilters.length > 0 && (
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-md p-4 w-11/12 max-w-2xl z-10 flex flex-wrap">
          {selectedFilters.map((filter, index) => (
            <span 
              key={index} 
              className="bg-teal-500 text-white text-xs px-3 py-1 rounded-full mr-2 mb-2 flex items-center"
            >
              {filter}
              <button 
                className="ml-2 text-xs text-white hover:text-gray-200" 
                onClick={() => removeFilter(filter)}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}



      <main className="p-8 pt-24 flex justify-center">
        <div className="w-full max-w-4xl">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white shadow-md rounded-md p-6 mb-6 flex flex-col lg:flex-row items-start justify-between">
              <div className="flex items-start">
                <img 
                  src={logoMap[job.company.toLowerCase()]}  
                  className="w-16 h-16 mr-6"
                />
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <h2 className="text-teal-500 text-xl font-bold mr-6">{job.company}</h2>
                    {job.new && (
                      <span className="bg-teal-500 text-white text-xs px-3 py-1 rounded-full mr-3">New!</span>
                    )}
                    {job.featured && (
                      <span className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full">Featured</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{job.position}</h3>
                  <p className="text-gray-500 mb-2">{job.postedAt} • {job.contract} • {job.location}</p>
                </div>
              </div>
              <div className="flex flex-col items-end mt-4 lg:mt-0">
                <div className="flex flex-wrap mb-2">
                  {job.languages.map((lang, index) => (
                    <button 
                      key={index} 
                      className={`bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full mr-2 mb-2 ${selectedFilters.includes(lang) ? 'bg-teal-500 text-white' : ''}`}
                      onClick={() => toggleFilter(lang)}
                    >
                      {lang}
                    </button>
                  ))}
                  {job.tools.map((tool, index) => (
                    <button 
                      key={index} 
                      className={`bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full mr-2 mb-2 ${selectedFilters.includes(tool) ? 'bg-teal-500 text-white' : ''}`}
                      onClick={() => toggleFilter(tool)}
                    >
                      {tool}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
