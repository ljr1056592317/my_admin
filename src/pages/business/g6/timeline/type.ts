interface Report {
  id: string;
  name: string;
  url: string;
}

interface Product {
  productName: string;
}

interface Enterprise {
  enterpriseName: string;
}

interface Technology {
  id: string;
  name: string;
  desc: string;
  reportList: Report[];
  productList: Product[];
  enterpriseList: Enterprise[];
}

interface YearData {
  year: number;
  technologyList: Technology[];
}
export type TimelineDataType = YearData[];
