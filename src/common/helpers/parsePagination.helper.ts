// validation verifies that it's a number string
export const parsePagination = (page: string, size: string) => {
  if (!page) page = '1';
  if (!size) size = '10';

  const parsedPage = parseInt(page);
  let parsedSize = parseInt(size);

  if (parsedSize > 100) parsedSize = 10;

  const skip = (parsedPage - 1) * parsedSize;
  const take = parsedSize;

  return { skip, take };
};
