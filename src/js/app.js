import data from './data';
import ErrorRepository from './ErrorRepository';

const errorRepository = new ErrorRepository(data);
console.log(errorRepository.translate(1));
console.log(errorRepository.translate(4));
console.log(errorRepository.translate(11));

