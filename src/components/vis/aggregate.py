import pandas as pd
import requests
import sys
import json

"""
Site Code per Continent
    North America:
        - ALT
    South America:
        - ABP
    Europe:
        - AMS
    Africa:
    Australia:
    Antartica:
    Asia:
        - AMY
    Ocean:
        - AOC
"""
def fetch_file_content_from_url(url):
    """
    Fetches the content of a file from a given URL.

    Parameters:
        url (str): The URL of the file to be fetched.

    Returns:
        str: The content of the file as a string.
    """
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad responses
        return response.text
    except requests.exceptions.RequestException as e:
        return f"Error fetching the file: {e}"

def daily_aggregate(url):
    """
    Reads hourly data from a URL, aggregates it to daily, and returns a list of JSON objects that can be readily visualized in chart.

    Parameters:
        url (str): The URL of the file containing the data to be aggregated.

    Returns:
        list: A list of dictionaries representing aggregated data, with each dictionary containing
              'date' and 'value' keys.
    """
    try:
        file_content_str = fetch_file_content_from_url(url)
        if file_content_str.startswith("Error"):
            return file_content_str
        # Split the string text based on new line
        file_content_list = file_content_str.split("\n")
        # Get the header lines (mentioned in the file's first line)
        header_lines = file_content_list[0].split(":")[-1]
        header_lines = int(header_lines)
        # Slice the non-header part of the data and remove the last empty element
        str_datas = file_content_list[header_lines - 1: -1]
        data = [data.replace("\n", "").split(" ") for data in str_datas]
        # Separate table body and head to form dataframe
        table_head = data[0]
        table_body = data[1:]
        dataframe = pd.DataFrame(table_body, columns=table_head)
        dataframe['value'] = dataframe['value'].astype(float)
        # Filter data
        mask = (dataframe["qcflag"] == "...") & (dataframe["value"] != 0) & (dataframe["value"] != -999)
        filtered_df = dataframe[mask].reset_index(drop=True)
        # Aggregate data (hourly into daily)
        aggregated_df = filtered_df.groupby(['year', 'month', 'day'])['value'].mean().reset_index()
        aggregated_df['value'] = aggregated_df['value'].round(2)
        # Process necessary columns
        aggregated_df['datetime'] = pd.to_datetime(aggregated_df[['year', 'month', 'day']])
        aggregated_df['datetime'] = aggregated_df['datetime'].dt.strftime('%Y-%m-%dT%H:%M:%SZ')
        processed_df = aggregated_df[['datetime', 'value']]
        processed_df = processed_df.sort_values(by='datetime')
        # Create dict for frontend [{date: , value: }]
        json_list = []
        for _, row in processed_df.iterrows():
            json_obj = {'date': row['datetime'], 'value': row['value']}
            json_list.append(json_obj)
        return json_list
    except Exception as e:
        return f"Exception occurred: {e}"

def monthly_aggregate(url):
    """
    Reads hourly data from a URL, aggregates it to monthly, and returns a list of JSON objects that can be readily visualized in chart.

    Parameters:
        url (str): The URL of the file containing the data to be aggregated.

    Returns:
        list: A list of dictionaries representing aggregated data, with each dictionary containing
              'date' and 'value' keys.
    """
    try:
        file_content_str = fetch_file_content_from_url(url)
        if file_content_str.startswith("Error"):
            return file_content_str
        # Split the string text based on new line
        file_content_list = file_content_str.split("\n")
        # Get the header lines (mentioned in the file's first line)
        header_lines = file_content_list[0].split(":")[-1]
        header_lines = int(header_lines)
        # Slice the non-header part of the data and remove the last empty element
        str_datas = file_content_list[header_lines - 1: -1]
        data = [data.replace("\n", "").split(" ") for data in str_datas]
        # Separate table body and head to form dataframe
        table_head = data[0]
        table_body = data[1:]
        dataframe = pd.DataFrame(table_body, columns=table_head)
        dataframe['value'] = dataframe['value'].astype(float)
        # Filter data
        mask = (dataframe["qcflag"] == "...") & (dataframe["value"] != 0) & (dataframe["value"] != -999)
        filtered_df = dataframe[mask].reset_index(drop=True)
        # Aggregate data (hourly into monthly)
        aggregated_df = filtered_df.groupby(['year', 'month'])['value'].mean().reset_index()
        aggregated_df['value'] = aggregated_df['value'].round(2)
        # Process necessary columns
        aggregated_df['datetime'] = pd.to_datetime(aggregated_df[['year', 'month']].assign(day=1))
        aggregated_df['datetime'] = aggregated_df['datetime'].dt.strftime('%Y-%m-%dT%H:%M:%SZ')
        processed_df = aggregated_df[['datetime', 'value']]
        processed_df = processed_df.sort_values(by='datetime')
        # Create dict for frontend [{date: , value: }]
        json_list = []
        for _, row in processed_df.iterrows():
            json_obj = {'date': row['datetime'], 'value': row['value']}
            json_list.append(json_obj)
        return json_list
    except Exception as e:
        return f"Exception occurred: {e}"

def yearly_aggregate(url):
    """
    Reads hourly data from a URL, aggregates it to yearly, and returns a list of JSON objects that can be readily visualized in chart.

    Parameters:
        url (str): The URL of the file containing the data to be aggregated.

    Returns:
        list: A list of dictionaries representing aggregated data, with each dictionary containing
              'date' and 'value' keys.
    """
    try:
        file_content_str = fetch_file_content_from_url(url)
        if file_content_str.startswith("Error"):
            return file_content_str
        # Split the string text based on new line
        file_content_list = file_content_str.split("\n")
        # Get the header lines (mentioned in the file's first line)
        header_lines = file_content_list[0].split(":")[-1]
        header_lines = int(header_lines)
        # Slice the non-header part of the data and remove the last empty element
        str_datas = file_content_list[header_lines - 1: -1]
        data = [data.replace("\n", "").split(" ") for data in str_datas]
        # Separate table body and head to form dataframe
        table_head = data[0]
        table_body = data[1:]
        dataframe = pd.DataFrame(table_body, columns=table_head)
        dataframe['value'] = dataframe['value'].astype(float)
        # Filter data
        mask = (dataframe["qcflag"] == "...") & (dataframe["value"] != 0) & (dataframe["value"] != -999)
        filtered_df = dataframe[mask].reset_index(drop=True)
        # Aggregate data (hourly into yearly)
        aggregated_df = filtered_df.groupby(['year'])['value'].mean().reset_index()
        aggregated_df['value'] = aggregated_df['value'].round(2)
        # Process necessary columns
        aggregated_df['datetime'] = pd.to_datetime(aggregated_df[['year']].assign(month=1, day=1))
        aggregated_df['datetime'] = aggregated_df['datetime'].dt.strftime('%Y-%m-%dT%H:%M:%SZ')
        processed_df = aggregated_df[['datetime', 'value']]
        processed_df = processed_df.sort_values(by='datetime')
        # Create dict for frontend [{date: , value: }]
        json_list = []
        for _, row in processed_df.iterrows():
            json_obj = {'date': row['datetime'], 'value': row['value']}
            json_list.append(json_obj)
        return json_list
    except Exception as e:
        return f"Exception occurred: {e}"

'''
# For testing purposes
if __name__ == "__main__":
    # Check if URL argument is provided
    if len(sys.argv) != 3:
        print("Usage: python aggregate.py <daily|monthly|yearly> <url>")
        sys.exit(1)

    # Get the aggregation frequency and URL from command line arguments
    frequency = sys.argv[1]
    data_url = sys.argv[2]

    # Call the aggregate function with the provided URL
    if frequency == "daily":
        result = daily_aggregate(data_url)
    elif frequency == "monthly":
        result = monthly_aggregate(data_url)
    elif frequency == "yearly":
        result = yearly_aggregate(data_url)
    else:
        print("Usage: python aggregate.py <daily|monthly|yearly> <url>")
        sys.exit(1)

    if result is not None:
        print(result)
        # Save the JSON file for reference
        out_path = f"{data_url.split('/')[-1].split('.')[0]}.json"
        with open(out_path, "w", encoding="utf-8") as file:
            json.dump(result, file)
'''